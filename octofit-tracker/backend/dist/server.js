"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const codespaces_1 = require("./config/codespaces");
const models_1 = require("./models/models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const apiBaseUrl = (0, codespaces_1.getApiBaseUrl)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-tracker-backend', port, apiBaseUrl });
});
app.get('/api/users', async (_req, res) => {
    try {
        const users = await models_1.User.find().lean();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load users', error });
    }
});
app.get('/api/users/', async (_req, res) => {
    try {
        const users = await models_1.User.find().lean();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load users', error });
    }
});
app.post('/api/users/', async (req, res) => {
    try {
        const user = await models_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create user', error });
    }
});
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await models_1.User.findById(req.params.id).lean();
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to read user', error });
    }
});
app.get('/api/teams', async (_req, res) => {
    try {
        const teams = await models_1.Team.find().populate('members').lean();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load teams', error });
    }
});
app.get('/api/teams/', async (_req, res) => {
    try {
        const teams = await models_1.Team.find().populate('members').lean();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load teams', error });
    }
});
app.post('/api/teams/', async (req, res) => {
    try {
        const team = await models_1.Team.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create team', error });
    }
});
app.get('/api/teams/:id', async (req, res) => {
    try {
        const team = await models_1.Team.findById(req.params.id).populate('members').lean();
        if (!team) {
            res.status(404).json({ message: 'Team not found' });
            return;
        }
        res.json(team);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to read team', error });
    }
});
app.get('/api/activities', async (_req, res) => {
    try {
        const activities = await models_1.Activity.find().populate('user').lean();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load activities', error });
    }
});
app.get('/api/activities/', async (_req, res) => {
    try {
        const activities = await models_1.Activity.find().populate('user').lean();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load activities', error });
    }
});
app.post('/api/activities/', async (req, res) => {
    try {
        const activity = await models_1.Activity.create(req.body);
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create activity', error });
    }
});
app.get('/api/activities/:id', async (req, res) => {
    try {
        const activity = await models_1.Activity.findById(req.params.id).populate('user').lean();
        if (!activity) {
            res.status(404).json({ message: 'Activity not found' });
            return;
        }
        res.json(activity);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to read activity', error });
    }
});
app.get('/api/leaderboard', async (_req, res) => {
    try {
        const leaderboard = await models_1.LeaderboardEntry.find().populate('user').lean();
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load leaderboard', error });
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const leaderboard = await models_1.LeaderboardEntry.find().populate('user').lean();
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load leaderboard', error });
    }
});
app.post('/api/leaderboard/', async (req, res) => {
    try {
        const boardItem = await models_1.LeaderboardEntry.create(req.body);
        res.status(201).json(boardItem);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create leaderboard item', error });
    }
});
app.get('/api/leaderboard/:id', async (req, res) => {
    try {
        const boardItem = await models_1.LeaderboardEntry.findById(req.params.id).populate('user').lean();
        if (!boardItem) {
            res.status(404).json({ message: 'Leaderboard entry not found' });
            return;
        }
        res.json(boardItem);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to read leaderboard entry', error });
    }
});
app.get('/api/workouts', async (_req, res) => {
    try {
        const workouts = await models_1.Workout.find().populate('suggestedFor').lean();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load workouts', error });
    }
});
app.get('/api/workouts/', async (_req, res) => {
    try {
        const workouts = await models_1.Workout.find().populate('suggestedFor').lean();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load workouts', error });
    }
});
app.post('/api/workouts/', async (req, res) => {
    try {
        const workout = await models_1.Workout.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to create workout', error });
    }
});
app.get('/api/workouts/:id', async (req, res) => {
    try {
        const workout = await models_1.Workout.findById(req.params.id).populate('suggestedFor').lean();
        if (!workout) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }
        res.json(workout);
    }
    catch (error) {
        res.status(400).json({ message: 'Unable to read workout', error });
    }
});
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB:', mongoUri);
        app.listen(port, () => {
            console.log(`OctoFit Tracker API listening on ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
