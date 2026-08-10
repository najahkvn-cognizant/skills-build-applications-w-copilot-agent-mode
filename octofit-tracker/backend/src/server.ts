import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { getApiBaseUrl } from './config/codespaces';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/models';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const apiBaseUrl = getApiBaseUrl();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend', port, apiBaseUrl });
});

app.get('/api/users', async (_req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load users', error });
  }
});

app.get('/api/users/', async (_req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load users', error });
  }
});

app.post('/api/users/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create user', error });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Unable to read user', error });
  }
});

app.get('/api/teams', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members').lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load teams', error });
  }
});

app.get('/api/teams/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members').lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load teams', error });
  }
});

app.post('/api/teams/', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create team', error });
  }
});

app.get('/api/teams/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members').lean();

    if (!team) {
      res.status(404).json({ message: 'Team not found' });
      return;
    }

    res.json(team);
  } catch (error) {
    res.status(400).json({ message: 'Unable to read team', error });
  }
});

app.get('/api/activities', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('user').lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load activities', error });
  }
});

app.get('/api/activities/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('user').lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load activities', error });
  }
});

app.post('/api/activities/', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create activity', error });
  }
});

app.get('/api/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('user').lean();

    if (!activity) {
      res.status(404).json({ message: 'Activity not found' });
      return;
    }

    res.json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Unable to read activity', error });
  }
});

app.get('/api/leaderboard', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().populate('user').lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load leaderboard', error });
  }
});

app.get('/api/leaderboard/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().populate('user').lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load leaderboard', error });
  }
});

app.post('/api/leaderboard/', async (req, res) => {
  try {
    const boardItem = await LeaderboardEntry.create(req.body);
    res.status(201).json(boardItem);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create leaderboard item', error });
  }
});

app.get('/api/leaderboard/:id', async (req, res) => {
  try {
    const boardItem = await LeaderboardEntry.findById(req.params.id).populate('user').lean();

    if (!boardItem) {
      res.status(404).json({ message: 'Leaderboard entry not found' });
      return;
    }

    res.json(boardItem);
  } catch (error) {
    res.status(400).json({ message: 'Unable to read leaderboard entry', error });
  }
});

app.get('/api/workouts', async (_req, res) => {
  try {
    const workouts = await Workout.find().populate('suggestedFor').lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load workouts', error });
  }
});

app.get('/api/workouts/', async (_req, res) => {
  try {
    const workouts = await Workout.find().populate('suggestedFor').lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load workouts', error });
  }
});

app.post('/api/workouts/', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create workout', error });
  }
});

app.get('/api/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('suggestedFor').lean();

    if (!workout) {
      res.status(404).json({ message: 'Workout not found' });
      return;
    }

    res.json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Unable to read workout', error });
  }
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB:', mongoUri);

    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening on ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
