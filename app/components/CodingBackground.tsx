"use client";

import { useState, useEffect, useRef } from "react";

const snippets = [
  `// JavaScript - Async Data Fetching
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    if (!response.ok) throw new Error('Fetch failed');
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};`,

  `// TypeScript - User Management System
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
}

class UserManager {
  private users: User[] = [];

  addUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      ...user,
      id: this.users.length + 1,
      createdAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  findUser(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
}`,

  `# Python - Data Processing Pipeline
import pandas as pd
import numpy as np
from typing import List, Dict

def process_dataset(file_path: str) -> pd.DataFrame:
    """Load and process dataset with validation."""
    df = pd.read_csv(file_path)
    
    # Clean missing values
    df = df.dropna(subset=['critical_column'])
    df = df.fillna({'optional_field': 'N/A'})
    
    # Normalize numerical columns
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    df[numeric_cols] = (df[numeric_cols] - df[numeric_cols].min()) / \\
                        (df[numeric_cols].max() - df[numeric_cols].min())
    
    return df`,

  `<!-- HTML - Responsive Card Component -->
<article class="card">
  <header class="card-header">
    <h2 class="card-title">Project Title</h2>
    <span class="card-badge">Active</span>
  </header>
  <div class="card-body">
    <p class="card-desc">
      A brief description of the project and its goals.
    </p>
    <ul class="card-tags">
      <li>React</li>
      <li>TypeScript</li>
      <li>Node.js</li>
    </ul>
  </div>
  <footer class="card-footer">
    <a href="/projects/1" class="card-link">View Project</a>
  </footer>
</article>`,

  `/* CSS - Modern Component Styles */
.card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 24px;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
}

.card-title {
  font-family: var(--serif);
  font-size: clamp(20px, 2.5vw, 28px);
  color: var(--text);
  margin-bottom: 12px;
}`,

  `// React - Custom Hook for API Data
"use client";

import { useState, useEffect } from "react";

interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}`,

  `// Node.js Express - REST API Server
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findMany();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  // Validate input
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  // Create user...
});

app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`,

  `// Python NumPy - Statistical Analysis
import numpy as np
from dataclasses import dataclass
from typing import Tuple

@dataclass
class Stats:
    mean: float
    median: float
    std: float
    min_val: float
    max_val: float

def analyze_data(data: list) -> Stats:
    """Calculate comprehensive statistics for dataset."""
    arr = np.array(data)
    
    return Stats(
        mean=float(np.mean(arr)),
        median=float(np.median(arr)),
        std=float(np.std(arr)),
        min_val=float(np.min(arr)),
        max_val=float(np.max(arr))
    )

# Usage
dataset = [23, 45, 12, 67, 89, 34, 56, 78, 90, 12]
stats = analyze_data(dataset)
print(f"Mean: {stats.mean:.2f}, Std: {stats.std:.2f}")`,

  `// Next.js 16 - Server Component
import { notFound } from "next/navigation";
import { getTranslations } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const translations = await getTranslations(locale);

  if (!translations) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {translations.welcome}
      </h1>
      <p className="text-muted-foreground">
        {translations.description}
      </p>
    </main>
  );
}`,

  `/* Tailwind Config - Custom Theme */
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#c8b89a',
          light: '#d4c6a8',
          dark: '#8a7a64'
        },
        muted: {
          DEFAULT: '#bbbbbb',
          foreground: '#8a8a8a'
        }
      },
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        mono: ['DM Mono', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};`,

  `// Redux Toolkit - State Management
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, status: 'idle' } as CounterState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;`,

  `// Rust - Async Web Server with Actix
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use actix_web::middleware::Logger;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::{Arc, Mutex};

#[derive(Serialize, Deserialize, Clone, Debug)]
struct User {
    id: u32,
    username: String,
    email: String,
    role: String,
}

#[derive(Serialize, Deserialize)]
struct CreateUserRequest {
    username: String,
    email: String,
    role: Option<String>,
}

struct AppState {
    users: Mutex<HashMap<u32, User>>,
    next_id: Mutex<u32>,
}

async fn get_users(state: web::Data<Arc<AppState>>) -> impl Responder {
    let users = state.users.lock().unwrap();
    let user_list: Vec<User> = users.values().cloned().collect();
    HttpResponse::Ok().json(web::Json(user_list))
}

async fn get_user(
    path: web::Path<u32>,
    state: web::Data<Arc<AppState>>,
) -> impl Responder {
    let user_id = path.into_inner();
    let users = state.users.lock().unwrap();
    
    match users.get(&user_id) {
        Some(user) => HttpResponse::Ok().json(user),
        None => HttpResponse::NotFound().body("User not found"),
    }
}

async fn create_user(
    req: web::Json<CreateUserRequest>,
    state: web::Data<Arc<AppState>>,
) -> impl Responder {
    let mut next_id = state.next_id.lock().unwrap();
    let mut users = state.users.lock().unwrap();
    
    let user = User {
        id: *next_id,
        username: req.username.clone(),
        email: req.email.clone(),
        role: req.role.clone().unwrap_or_else(|| "user".to_string()),
    };
    
    users.insert(*next_id, user.clone());
    *next_id += 1;
    
    HttpResponse::Created().json(web::Json(user))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();
    
    let state = Arc::new(AppState {
        users: Mutex::new(HashMap::new()),
        next_id: Mutex::new(1),
    });
    
    println!("Server running at http://127.0.0.1:8080");
    
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(state.clone()))
            .wrap(Logger::default())
            .route("/users", web::get().to(get_users))
            .route("/users", web::post().to(create_user))
            .route("/users/{id}", web::get().to(get_user))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}`,

  `// C++ - Smart Pointer Implementation
#include <iostream>
#include <memory>
#include <string>
#include <unordered_map>
#include <vector>

template<typename T>
class SmartPointer {
private:
    T* ptr;
    size_t* ref_count;
    
public:
    // Constructor
    explicit SmartPointer(T* p = nullptr) 
        : ptr(p), ref_count(new size_t(1)) {}
    
    // Copy constructor
    SmartPointer(const SmartPointer& other)
        : ptr(other.ptr), ref_count(other.ref_count) {
        ++(*ref_count);
    }
    
    // Move constructor
    SmartPointer(SmartPointer&& other) noexcept
        : ptr(other.ptr), ref_count(other.ref_count) {
        other.ptr = nullptr;
        other.ref_count = nullptr;
    }
    
    // Destructor
    ~SmartPointer() {
        if (ref_count && --(*ref_count) == 0) {
            delete ptr;
            delete ref_count;
        }
    }
    
    // Copy assignment
    SmartPointer& operator=(const SmartPointer& other) {
        if (this != &other) {
            if (ref_count && --(*ref_count) == 0) {
                delete ptr;
                delete ref_count;
            }
            ptr = other.ptr;
            ref_count = other.ref_count;
            ++(*ref_count);
        }
        return *this;
    }
    
    // Dereference operators
    T& operator*() const { return *ptr; }
    T* operator->() const { return ptr; }
    
    // Utility methods
    T* get() const { return ptr; }
    size_t use_count() const { return ref_count ? *ref_count : 0; }
    bool unique() const { return use_count() == 1; }
    operator bool() const { return ptr != nullptr; }
    
    void reset(T* p = nullptr) {
        if (ref_count && --(*ref_count) == 0) {
            delete ptr;
            delete ref_count;
        }
        ptr = p;
        ref_count = new size_t(1);
    }
};

// Usage example
int main() {
    SmartPointer<int> p1(new int(42));
    std::cout << "Value: " << *p1 << std::endl;
    std::cout << "Ref count: " << p1.use_count() << std::endl;
    
    {
        SmartPointer<int> p2 = p1;
        std::cout << "Ref count after copy: " << p1.use_count() << std::endl;
        *p2 = 100;
        std::cout << "Modified via p2: " << *p1 << std::endl;
    }
    
    std::cout << "Ref count after p2 destroyed: " << p1.use_count() << std::endl;
    return 0;
}`,

  `// Ruby on Rails - Models, Controllers & Migrations
# app/models/user.rb
class User < ApplicationRecord
  has_secure_password
  
  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 8 }, if: -> { password.present? }
  
  has_many :projects, dependent: :destroy
  has_many :comments, dependent: :destroy
  
  def self.search(query)
    where("username LIKE ? OR email LIKE ?", "%#{query}%", "%#{query}%")
  end
  
  def generate_auth_token
    payload = { user_id: id, exp: 24.hours.from_now.to_i }
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end
end

# app/controllers/api/v1/users_controller.rb
module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_request, except: [:create]
      
      def index
        @users = User.search(params[:q])
        render json: @users, status: :ok
      end
      
      def show
        @user = User.find(params[:id])
        render json: @user, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'User not found' }, status: :not_found
      end
      
      def create
        @user = User.new(user_params)
        
        if @user.save
          token = @user.generate_auth_token
          render json: { user: @user, token: token }, status: :created
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      def update
        @user = User.find(params[:id])
        
        if @user.update(user_params)
          render json: @user, status: :ok
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      def destroy
        @user = User.find(params[:id])
        @user.destroy
        head :no_content
      end
      
      private
      
      def user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation)
      end
      
      def authenticate_request
        header = request.headers['Authorization']
        return render json: { error: 'Missing token' }, status: :unauthorized unless header
        
        token = header.split(' ').last
        begin
          decoded = JWT.decode(token, Rails.application.credentials.secret_key_base)[0]
          @current_user = User.find(decoded['user_id'])
        rescue JWT::DecodeError
          render json: { error: 'Invalid token' }, status: :unauthorized
        end
      end
    end
  end
end

# db/migrate/001_create_users.rb
class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :role, default: 'user'
      t.boolean :active, default: true
      t.timestamps
    end
    
    add_index :users, :email, unique: true
    add_index :users, :username, unique: true
  end
end`,

  `// GraphQL - Schema, Resolvers & Queries
# schema.graphql
type User {
  id: ID!
  username: String!
  email: String!
  role: String!
  projects: [Project!]!
  createdAt: DateTime!
}

type Project {
  id: ID!
  name: String!
  description: String
  status: ProjectStatus!
  techStack: [String!]!
  owner: User!
  createdAt: DateTime!
}

enum ProjectStatus {
  ACTIVE
  COMPLETED
  ARCHIVED
}

type Query {
  users: [User!]!
  user(id: ID!): User
  projects(status: ProjectStatus): [Project!]!
  project(id: ID!): Project
  me: User
}

type Mutation {
  createUser(input: CreateUserInput!): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
  createProject(input: CreateProjectInput!): Project!
  updateProject(id: ID!, input: UpdateProjectInput!): Project!
  deleteProject(id: ID!): Boolean!
}

input CreateUserInput {
  username: String!
  email: String!
  password: String!
}

input CreateProjectInput {
  name: String!
  description: String
  techStack: [String!]!
}

type AuthPayload {
  token: String!
  user: User!
}

# resolvers.js
const resolvers = {
  Query: {
    users: async (_, __, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return User.findMany();
    },
    
    user: async (_, { id }) => {
      const user = await User.findById(id);
      if (!user) throw new Error('User not found');
      return user;
    },
    
    projects: async (_, { status }) => {
      const filter = status ? { status } : {};
      return Project.findMany(filter);
    },
    
    me: async (_, __, { user }) => user,
  },
  
  Mutation: {
    createUser: async (_, { input }) => {
      const existing = await User.findOne({ email: input.email });
      if (existing) throw new Error('Email already exists');
      
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const user = await User.create({
        ...input,
        password: hashedPassword,
      });
      
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return { token, user };
    },
    
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid credentials');
      
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid credentials');
      
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return { token, user };
    },
  },
  
  User: {
    projects: async (user) => {
      return Project.findMany({ ownerId: user.id });
    },
  },
};

module.exports = resolvers;`,
];

export default function CodingBackground() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const snippetIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const typeNextChar = () => {
      const currentSnippet = snippets[snippetIndexRef.current];

      if (charIndexRef.current < currentSnippet.length) {
        setText(currentSnippet.slice(0, charIndexRef.current + 1));
        charIndexRef.current++;
        timeoutRef.current = setTimeout(typeNextChar, 30 + Math.random() * 20);
      } else {
        timeoutRef.current = setTimeout(() => {
          setText("");
          charIndexRef.current = 0;
          snippetIndexRef.current =
            (snippetIndexRef.current + 1) % snippets.length;
          typeNextChar();
        }, 2000);
      }
    };

    typeNextChar();

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        fontFamily: "'DM Mono', monospace",
        fontSize: "14px",
        lineHeight: 1.6,
        color: "var(--muted)",
        opacity: 0.30,
        padding: "48px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflow: "hidden",
      }}
    >
      {text}
      <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
    </div>
  );
}
