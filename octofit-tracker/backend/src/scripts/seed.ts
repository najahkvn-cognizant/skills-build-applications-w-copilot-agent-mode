import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      {
        name: 'Avery Stone',
        email: 'avery.stone@octofit.com',
        passwordHash: 'demo-hash-1',
        profile: {
          avatarUrl: 'https://example.com/avery.png',
          age: 29,
          fitnessGoal: 'Half marathon training',
          weeklyTarget: 180
        }
      },
      {
        name: 'Jordan Miles',
        email: 'jordan.miles@octofit.com',
        passwordHash: 'demo-hash-2',
        profile: {
          avatarUrl: 'https://example.com/jordan.png',
          age: 34,
          fitnessGoal: 'Strength endurance',
          weeklyTarget: 210
        }
      },
      {
        name: 'Taylor Brooks',
        email: 'taylor.brooks@octofit.com',
        passwordHash: 'demo-hash-3',
        profile: {
          avatarUrl: 'https://example.com/taylor.png',
          age: 25,
          fitnessGoal: 'Improve mobility',
          weeklyTarget: 120
        }
      }
    ]);

    await Team.insertMany([
      {
        name: 'Ridge Runners',
        sport: 'Running',
        members: [users[0]._id, users[2]._id]
      },
      {
        name: 'Pulse Cyclers',
        sport: 'Cycling',
        members: [users[1]._id]
      }
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Running',
        distanceKm: 5.2,
        durationMinutes: 38,
        date: new Date('2026-08-09T06:00:00Z')
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        distanceKm: 18.4,
        durationMinutes: 55,
        date: new Date('2026-08-10T08:30:00Z')
      },
      {
        user: users[2]._id,
        type: 'Yoga',
        distanceKm: 0,
        durationMinutes: 28,
        date: new Date('2026-08-11T18:00:00Z')
      }
    ]);

    await LeaderboardEntry.insertMany([
      {
        user: users[0]._id,
        points: 920,
        rank: 1,
        activityScore: 95,
        updatedAt: new Date()
      },
      {
        user: users[1]._id,
        points: 820,
        rank: 2,
        activityScore: 88,
        updatedAt: new Date()
      },
      {
        user: users[2]._id,
        points: 760,
        rank: 3,
        activityScore: 84,
        updatedAt: new Date()
      }
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Runner',
        difficulty: 'Intermediate',
        durationMinutes: 32,
        suggestedFor: [users[0]._id]
      },
      {
        title: 'Core Stability Circuit',
        difficulty: 'Beginner',
        durationMinutes: 25,
        suggestedFor: [users[2]._id]
      },
      {
        title: 'Tempo Ride Builder',
        difficulty: 'Advanced',
        durationMinutes: 45,
        suggestedFor: [users[1]._id]
      }
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
