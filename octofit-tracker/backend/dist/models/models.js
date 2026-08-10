"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, default: '' },
    profile: {
        avatarUrl: String,
        age: Number,
        fitnessGoal: String,
        weeklyTarget: Number
    },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'users' });
const TeamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    sport: { type: String, required: true },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
}, { collection: 'teams' });
const ActivitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    distanceKm: Number,
    durationMinutes: Number,
    date: { type: Date, required: true }
}, { collection: 'activities' });
const LeaderboardSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number, required: true },
    activityScore: Number,
    updatedAt: { type: Date, default: Date.now }
}, { collection: 'leaderboard' });
const WorkoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    suggestedFor: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
}, { collection: 'workouts' });
exports.User = mongoose_1.default.models.User || mongoose_1.default.model('User', UserSchema);
exports.Team = mongoose_1.default.models.Team || mongoose_1.default.model('Team', TeamSchema);
exports.Activity = mongoose_1.default.models.Activity || mongoose_1.default.model('Activity', ActivitySchema);
exports.LeaderboardEntry = mongoose_1.default.models.LeaderboardEntry || mongoose_1.default.model('LeaderboardEntry', LeaderboardSchema);
exports.Workout = mongoose_1.default.models.Workout || mongoose_1.default.model('Workout', WorkoutSchema);
