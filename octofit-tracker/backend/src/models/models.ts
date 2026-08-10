import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
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
  },
  { collection: 'users' }
);

const TeamSchema = new Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
  },
  { collection: 'teams' }
);

const ActivitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    distanceKm: Number,
    durationMinutes: Number,
    date: { type: Date, required: true }
  },
  { collection: 'activities' }
);

const LeaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number, required: true },
    activityScore: Number,
    updatedAt: { type: Date, default: Date.now }
  },
  { collection: 'leaderboard' }
);

const WorkoutSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    suggestedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
  },
  { collection: 'workouts' }
);

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', TeamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', LeaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', WorkoutSchema);
