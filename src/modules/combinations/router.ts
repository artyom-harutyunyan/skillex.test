import express, { Request, Response} from 'express';
import service from './service';
import { validateBody } from './middleware';

const router = express.Router();

router.post('/generate', validateBody, async (req: Request, res: Response) => {
  try {
    const result = await service.generate(req.body);
    return res.json(result);
  } catch (error: Error | any) {
    res.status(500).json({ error: `${error.cause === 400 ? error.message : 'Internal server error'}` });
  }
});

export default router;