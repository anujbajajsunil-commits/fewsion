import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function start() {
  const app = express();
  app.use(express.json());

  // Setup security headers (safe inside frame)
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    next();
  });

  const PORT = 3000;

  // Initialize server-side Gemini client
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (apiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
      console.log('Gemini API client successfully initialized.');
    } catch (e) {
      console.error('Failed to initialize Gemini API client:', e);
    }
  } else {
    console.warn('GEMINI_API_KEY env is missing. Falling back on responsive rules matching.');
  }

  // --- API ROUTING FIRST ---
  
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Secure Gemini AI Recommendation Engine
  app.post('/api/gemini/recommend', async (req, res) => {
    const { campaignName, description, requirements, influencers } = req.body;

    if (!campaignName || !description) {
      return res.status(400).json({ error: 'campaignName and description are required.' });
    }

    // Heuristic matches as fallback
    const mockRecommendations = getHeuristicRecommendations(description, requirements, influencers);

    if (!ai) {
      return res.json({
        recommendations: mockRecommendations,
        source: 'local_heuristic_engine',
        warning: 'GEMINI_API_KEY not configured. Using local matching rule system.'
      });
    }

    try {
      const prompt = `Give an expert influencer selection analysis for campaign: "${campaignName}".
Description: "${description}"
Requirements: "${requirements}"

Candidates:
${JSON.stringify(influencers || [], null, 2)}

Provide structured JSON recommendation specifying which 2 influencers fit best, exactly why (key strengths for this campaign), and a recommended custom activation strategy (e.g. video integration concept, post tone) for each matching creator to maximize campaign ROI. Return as JSON array.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: 'You are an elite CMO and SaaS AI agent that recommends matching influencers for campaigns. Analyze targets carefully and return structured JSON list with fields: id, score (0-100), matchReason, strategy.',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: 'The unique candidate ID' },
                score: { type: Type.INTEGER, description: 'Match score out of 100' },
                matchReason: { type: Type.STRING, description: 'Details on why this candidate is a stellar fit' },
                strategy: { type: Type.STRING, description: 'Custom activation campaign content idea' }
              },
              required: ['id', 'score', 'matchReason', 'strategy']
            }
          }
        }
      });

      const text = response.text || '[]';
      const parsed = JSON.parse(text);

      res.json({
        recommendations: parsed,
        source: 'gemini-3.5-flash',
      });
    } catch (err: any) {
      console.error('Gemini API call failed, reverting to heuristics:', err.message);
      res.json({
        recommendations: mockRecommendations,
        source: 'local_heuristic_engine_fallback',
        error: err.message
      });
    }
  });

  // Simulated Payment Signature validation (Demonstrates Enterpise grade Stripe/Razorpay)
  app.post('/api/payments/verify-webhook', (req, res) => {
    const { paymentId, gateway, signature } = req.body;
    // Enterpise payment validation rules mock
    console.log(`[PAYMENT SECURITY WebhooK] Received ${gateway} authorization for id: ${paymentId}`);
    res.json({
      verified: true,
      timestamp: new Date().toISOString(),
      transactionDetails: {
        gateway,
        paymentId,
        securityCheck: 'passed',
        ledgerAuditId: `LDR-${Math.floor(100000 + Math.random() * 900000)}`
      }
    });
  });

  // --- VITE DEV MIDDLEWARE OR STATIC PRODUCTION FILES ---
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server running at space: http://localhost:${PORT}`);
  });
}

// Simple deterministic fallback engine in case API key isn't provided
function getHeuristicRecommendations(description: string, requirements: string, influencers: any[]) {
  const normalizedDesc = (description + ' ' + (requirements || '')).toLowerCase();
  
  return (influencers || []).map((inf: any) => {
    let score = 70; // baseline
    let strategy = '';
    let matchReasons = [];

    // keyword checks
    if (normalizedDesc.includes('tech') || normalizedDesc.includes('gadget') || normalizedDesc.includes('accessories') || normalizedDesc.includes('hardware') || normalizedDesc.includes('audio')) {
      if (inf.niche.toLowerCase().includes('tech') || inf.name.includes('Aria') || inf.name.includes('David')) {
        score += 25;
        matchReasons.push('Strong technology audience overlap.');
        strategy = `Integrate the device into a comprehensive workspace desk tour, highlighting daily battery performance and build quality.`;
      }
    }
    
    if (normalizedDesc.includes('wellness') || normalizedDesc.includes('fitness') || normalizedDesc.includes('organic') || normalizedDesc.includes('supplements')) {
      if (inf.niche.toLowerCase().includes('fitness') || inf.niche.toLowerCase().includes('wellness') || inf.name.includes('Marcus')) {
        score += 25;
        matchReasons.push('Audience is highly engaged with dietary and training habits.');
        strategy = `Demonstrate product prep during a fast-paced morning "wake up with me" visual routine to highlight lifestyle integration.`;
      }
    }

    if (normalizedDesc.includes('travel') || normalizedDesc.includes('photography') || normalizedDesc.includes('fashion')) {
      if (inf.niche.toLowerCase().includes('travel') || inf.niche.toLowerCase().includes('photography') || inf.niche.toLowerCase().includes('beauty') || inf.name.includes('Elena') || inf.name.includes('Chloe')) {
        score += 24;
        matchReasons.push('Excellent static visual production standards matching premium aesthetic.');
        strategy = `Present beautiful destination/outfit shots using the brand assets carefully framed in picturesque locations.`;
      }
    }

    if (matchReasons.length === 0) {
      score += Math.floor(Math.random() * 15);
      matchReasons.push('Good general audience reach and stable engagement rate.');
      strategy = `Create a carousel storytelling post focusing on personal experiences and user benefit.`;
    }

    return {
      id: inf.id,
      score: Math.min(score, 99),
      matchReason: matchReasons.join(' '),
      strategy
    };
  }).sort((a, b) => b.score - a.score).slice(0, 2);
}

start();
