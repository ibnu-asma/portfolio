"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Code,
  Database,
  Cloud,
  Settings,
  Terminal,
  Activity,
  Server,
  Cpu,
  HardDrive,
  Network,
  Zap,
  BookOpen,
  Award,
  Eye,
  GitBranch,
  Clock,
  Sun,
  Moon,
} from "lucide-react"

// Theme Context
const useTheme = () => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light")
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  return { isDark, toggleTheme: () => setIsDark(!isDark) }
}

// Typewriter Effect Hook
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  return displayText
}

// Delayed Typewriter Effect Hook
const useDelayedTypewriter = (text: string, delay: number, speed: number = 100) => {
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      let i = 0
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(timer)
        }
      }, speed)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [text, delay, speed])

  return displayText
}

// Theme Toggle Component
const ThemeToggle = ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => {
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle fixed top-6 right-6 z-50 p-3 rounded-full group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun
          className={`absolute inset-0 w-6 h-6 text-amber-500 transition-all duration-300 ${
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          className={`absolute inset-0 w-6 h-6 text-cyan-400 transition-all duration-300 ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  )
}

// Simulated real-time system metrics
const useSystemMetrics = () => {
  const [metrics, setMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 67,
    diskUsage: 34,
    networkIO: 128,
    activeConnections: 1247,
    requestsPerSecond: 342,
    uptime: "99.97%",
    responseTime: 23,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        cpuUsage: Math.max(20, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        diskUsage: Math.max(20, Math.min(80, prev.diskUsage + (Math.random() - 0.5) * 5)),
        networkIO: Math.max(50, Math.min(500, prev.networkIO + (Math.random() - 0.5) * 50)),
        activeConnections: Math.max(
          800,
          Math.min(2000, prev.activeConnections + Math.floor((Math.random() - 0.5) * 100)),
        ),
        requestsPerSecond: Math.max(
          200,
          Math.min(800, prev.requestsPerSecond + Math.floor((Math.random() - 0.5) * 50)),
        ),
        uptime: prev.uptime,
        responseTime: Math.max(10, Math.min(100, prev.responseTime + (Math.random() - 0.5) * 10)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return metrics
}

// Interactive Terminal Component
const InteractiveTerminal = () => {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState([
    "$ whoami",
    "Abdulhamid Hayredin - Senior Backend Developer @ NEO AI",
    "$ _",
  ])

  const commands = {
    help: "Available commands: whoami, skills, projects, contact, clear",
    whoami: "Abdulhamid Hayredin - Senior Backend Developer @ NEO AI",
    skills: "Laravel, .NET, Django, PHP, C#, Python",
    projects: "ERP System, Recruitment Agency Platform",
    contact: "Email: abdulhamidhayredin94@gmail.com | LinkedIn: /in/ibnu-asma | GitHub: /ibnu-asma",
    clear: "CLEAR_TERMINAL",
  }

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()
    const output = commands[command as keyof typeof commands] || `Command not found: ${cmd}`

    if (output === "CLEAR_TERMINAL") {
      setHistory(["$ _"])
    } else {
      setHistory((prev) => [...prev.slice(0, -1), `$ ${cmd}`, output, "$ _"])
    }
    setInput("")
  }

  return (
    <div className="terminal-enhanced p-6 rounded-xl font-mono text-sm h-72 overflow-y-auto shadow-2xl">
      {history.map((line, i) => (
        <div
          key={i}
          className={line.startsWith("$") ? "text-terminal-prompt terminal-text-enhanced" : "text-terminal-output"}
        >
          {line}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-terminal-prompt terminal-text-enhanced">$ </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleCommand(input)}
          className="bg-transparent border-none outline-none flex-1 text-terminal-text terminal-text-enhanced ml-1"
          placeholder="Type 'help' for available commands..."

        />
      </div>
    </div>
  )
}

// API Status Dashboard
const APIStatusDashboard = () => {
  const [apiStatus, setApiStatus] = useState([
    { name: "ERP System API", status: "healthy", responseTime: 45, uptime: 99.9 },
    { name: "User Management", status: "healthy", responseTime: 67, uptime: 99.8 },
    { name: "Authentication Service", status: "warning", responseTime: 123, uptime: 98.5 },
    { name: "Database Service", status: "healthy", responseTime: 89, uptime: 99.7 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setApiStatus((prev) =>
        prev.map((api) => ({
          ...api,
          responseTime: Math.max(20, Math.min(200, api.responseTime + (Math.random() - 0.5) * 20)),
          uptime: Math.max(95, Math.min(100, api.uptime + (Math.random() - 0.5) * 0.1)),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-success"
      case "warning":
        return "text-warning"
      case "error":
        return "text-error"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {apiStatus.map((api, i) => (
        <div key={i} className="interactive-card api-card bg-card p-6 rounded-xl border border-border shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-foreground">{api.name}</h4>
            <span className={`text-sm font-medium ${getStatusColor(api.status)}`}>● {api.status}</span>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Response:</span>
              <span className="font-mono">{api.responseTime.toFixed(0)}ms</span>
            </div>
            <div className="flex justify-between">
              <span>Uptime:</span>
              <span className="font-mono text-success">{api.uptime.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Code Snippet Viewer
const CodeSnippetViewer = () => {
  const [activeTab, setActiveTab] = useState(0)
  const codeSnippets = [
    {
      title: "PHP - Laravel API Controller",
      language: "php",
      code: `<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'User created successfully'
        ], 201);
    }
}`,
    },
    {
      title: "C# - ASP.NET Core Web API",
      language: "csharp",
      code: `using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        try
        {
            var products = await _context.Products
                .Where(p => p.IsActive)
                .OrderBy(p => p.Name)
                .ToListAsync();

            return Ok(new
            {
                Success = true,
                Data = products,
                Count = products.Count
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                Success = false,
                Message = "Internal server error",
                Error = ex.Message
            });
        }
    }
}`,
    },
    {
      title: "Python - Django REST API",
      language: "python",
      code: `from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Employee
from .serializers import EmployeeSerializer

@api_view(['GET', 'POST'])
def employee_list(request):
    if request.method == 'GET':
        employees = Employee.objects.filter(is_active=True)
        serializer = EmployeeSerializer(employees, many=True)
        
        return Response({
            'success': True,
            'data': serializer.data,
            'count': employees.count()
        })
    
    elif request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'data': serializer.data,
                'message': 'Employee created successfully'
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)`,
    },
  ]

  return (
    <div className="interactive-card code-enhanced bg-card rounded-xl overflow-hidden border border-border shadow-2xl">
      <div className="flex border-b border-border bg-muted/30">
        {codeSnippets.map((snippet, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`tab-button px-6 py-4 text-sm font-medium transition-all duration-200 ${
              activeTab === i
                ? "active bg-primary text-primary-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {snippet.title}
          </button>
        ))}
      </div>
      <div className="p-6 bg-code">
        <pre className="text-sm text-code-text overflow-x-auto">
          <code>{codeSnippets[activeTab].code}</code>
        </pre>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const { isDark, toggleTheme } = useTheme()
  const metrics = useSystemMetrics()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

      {/* Header/Hero Section with Live Metrics */}
      <header className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
                <span className="block">{useTypewriter("Abdulhamid Hayredin", 80)}</span>
                <span className="block text-primary text-2xl sm:text-3xl font-medium mt-2">
                  {useDelayedTypewriter("Senior Backend Developer at NEO AI", 1500, 60)}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Passionate backend developer with expertise in Laravel, .NET, and Django frameworks. Focused on 
                building scalable, high-performance applications with clean architecture and robust database design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="interactive-button bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl"
                >
                  View Projects
                </button>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="interactive-button border border-border hover:border-primary/50 text-foreground hover:text-primary px-8 py-3 rounded-lg font-medium"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Live System Metrics Dashboard */}
            <div className="interactive-card metric-card bg-card p-6 rounded-xl border border-border shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-foreground">
                <Activity className="w-5 h-5 mr-2 text-success" />
                Live System Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-muted-foreground">
                    <Cpu className="w-4 h-4 mr-2 text-primary" />
                    CPU
                  </span>
                  <span className="font-mono text-foreground metric-value">{metrics.cpuUsage.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-muted-foreground">
                    <HardDrive className="w-4 h-4 mr-2 text-secondary" />
                    Memory
                  </span>
                  <span className="font-mono text-foreground metric-value">{metrics.memoryUsage.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-muted-foreground">
                    <Network className="w-4 h-4 mr-2 text-success" />
                    Network
                  </span>
                  <span className="font-mono text-foreground metric-value">{metrics.networkIO.toFixed(0)} MB/s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-muted-foreground">
                    <Server className="w-4 h-4 mr-2 text-warning" />
                    Uptime
                  </span>
                  <span className="font-mono text-success metric-value">{metrics.uptime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-muted-foreground">
                    <Zap className="w-4 h-4 mr-2 text-accent" />
                    RPS
                  </span>
                  <span className="font-mono text-foreground metric-value">{metrics.requestsPerSecond}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2 text-error" />
                    Response
                  </span>
                  <span className="font-mono text-foreground metric-value">{metrics.responseTime.toFixed(0)}ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Terminal Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center text-foreground">
            <Terminal className="w-8 h-8 mr-3 text-success" />
            Interactive Terminal
          </h2>
          <div className="max-w-4xl mx-auto">
            <InteractiveTerminal />
            <p className="text-center text-muted-foreground mt-4 text-sm">
              Try commands: help, whoami, skills, projects, contact, clear
            </p>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">About Me</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                With over 3 years of experience in backend development, I specialize in building robust enterprise 
                applications using Laravel, .NET, and Django. At NEO AI, I develop and maintain scalable backend 
                systems that power business-critical applications and enterprise solutions.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                My expertise includes API development, database optimization, and system integration. I'm passionate 
                about clean code architecture, performance optimization, and delivering reliable solutions that meet 
                complex business requirements.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">Current Focus Areas</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-foreground">Enterprise Application Development</h4>
                    <p className="text-muted-foreground text-sm">Building scalable ERP and business management systems</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-foreground">API Development & Integration</h4>
                    <p className="text-muted-foreground text-sm">RESTful APIs and third-party system integrations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-foreground">Database Design & Optimization</h4>
                    <p className="text-muted-foreground text-sm">MySQL, SQL Server, and PostgreSQL performance tuning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 flex items-center justify-center text-foreground">
            <BookOpen className="w-8 h-8 mr-3 text-primary" />
            Education & Work Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Education
              </h3>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold text-foreground">Bachelor of Science in Computer Science</h4>
                  <p className="text-muted-foreground">Hawassa University • 2019-2023</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Focus: Software Engineering & Database Systems
                  </p>
                </div>
                <div className="border-l-2 border-success pl-4">
                  <h4 className="font-semibold text-foreground">Professional Development</h4>
                  <p className="text-muted-foreground">Continuous Learning • 2023-Present</p>
                  <p className="text-sm text-muted-foreground mt-1">Laravel, .NET Core, Django Frameworks</p>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
                <Award className="w-5 h-5 mr-2 text-warning" />
                Work Experience
              </h3>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="font-semibold text-foreground">Senior Backend Developer</h4>
                  <p className="text-muted-foreground">NEO AI • 2023-Present</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Developing scalable backend systems with Laravel, .NET, and Django
                  </p>
                </div>
                <div className="border-l-2 border-success pl-4">
                  <h4 className="font-semibold text-foreground">Web Application Tester</h4>
                  <p className="text-muted-foreground">INSA • 2024-Present</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Quality assurance and testing of web applications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Interactive Elements */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Languages */}
            <div className="interactive-card skill-card bg-card p-6 rounded-xl border border-border shadow-lg">
              <div className="flex items-center mb-4">
                <Code className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-foreground">Languages</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Python</span>
                  <div className="w-20 bg-muted rounded-full h-2 skill-bar">
                    <div
                      className="bg-primary h-2 rounded-full skill-bar-fill"
                      style={{ "--skill-width": "85%" } as React.CSSProperties}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">PHP</span>
                  <div className="w-20 bg-muted rounded-full h-2 skill-bar">
                    <div
                      className="bg-primary h-2 rounded-full skill-bar-fill"
                      style={{ "--skill-width": "90%" } as React.CSSProperties}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">C#</span>
                  <div className="w-20 bg-muted rounded-full h-2 skill-bar">
                    <div
                      className="bg-primary h-2 rounded-full skill-bar-fill"
                      style={{ "--skill-width": "80%" } as React.CSSProperties}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Frameworks */}
            <div className="interactive-card skill-card bg-card p-6 rounded-xl border border-border shadow-lg">
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-success mr-2" />
                <h3 className="text-xl font-semibold text-foreground">Frameworks</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                  Laravel / Eloquent
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                  ASP.NET Core
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                  Django / DRF
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                  Entity Framework
                </li>
              </ul>
            </div>

            {/* Databases */}
            <div className="interactive-card skill-card bg-card p-6 rounded-xl border border-border shadow-lg">
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-secondary mr-2" />
                <h3 className="text-xl font-semibold text-foreground">Databases</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                  MySQL
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                  SQL Server
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                  PostgreSQL
                </li>
              </ul>
            </div>
          </div>

          {/* Code Examples */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">Code Examples</h3>
            <CodeSnippetViewer />
          </div>
        </div>
      </section>

      {/* API Status Dashboard */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center text-foreground">
            <Server className="w-8 h-8 mr-3 text-success" />
            Live API Status Dashboard
          </h2>
          <APIStatusDashboard />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="interactive-card project-card bg-card rounded-xl p-6 border border-border shadow-lg">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-foreground">ERP System</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Comprehensive Enterprise Resource Planning system built with Laravel. Features inventory management, 
                financial tracking, and multi-tenant architecture for scalable business operations.
              </p>
              <div className="mb-4">
                <div className="text-sm text-muted-foreground mb-2">Key Features:</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-muted-foreground">
                    Modules: <span className="text-success">15+ integrated</span>
                  </div>
                  <div className="text-muted-foreground">
                    Users: <span className="text-success">Multi-tenant</span>
                  </div>
                  <div className="text-muted-foreground">
                    Reports: <span className="text-success">Real-time</span>
                  </div>
                  <div className="text-muted-foreground">
                    API: <span className="text-success">RESTful</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm">Laravel</span>
                <span className="bg-success text-white px-2 py-1 rounded text-sm">PHP</span>
                <span className="bg-secondary text-white px-2 py-1 rounded text-sm">MySQL</span>
                <span className="bg-warning text-white px-2 py-1 rounded text-sm">React</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="interactive-card project-card bg-card rounded-xl p-6 border border-border shadow-lg">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-foreground">Recruitment Agency Platform</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Full-stack recruitment platform built with Laravel. Features candidate tracking, 
                job matching algorithms, and automated workflow management for recruitment agencies.
              </p>
              <div className="mb-4">
                <div className="text-sm text-muted-foreground mb-2">Platform Features:</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-muted-foreground">
                    Matching: <span className="text-primary">Algorithm-based</span>
                  </div>
                  <div className="text-muted-foreground">
                    Workflow: <span className="text-success">Automated</span>
                  </div>
                  <div className="text-muted-foreground">
                    Integration: <span className="text-warning">Multi-platform</span>
                  </div>
                  <div className="text-muted-foreground">
                    Analytics: <span className="text-secondary">Real-time</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm">Laravel</span>
                <span className="bg-success text-white px-2 py-1 rounded text-sm">PHP</span>
                <span className="bg-secondary text-white px-2 py-1 rounded text-sm">MySQL</span>
                <span className="bg-warning text-white px-2 py-1 rounded text-sm">React</span>
              </div>
              <a
                href="https://aldurrahr.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live Site
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Get In Touch</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">Send me a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="interactive-button w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">Connect with me</h3>
              <div className="space-y-4">
                <a
                  href="mailto:abdulhamidhayredin94@gmail.com"
                  className="contact-card interactive-card flex items-center p-4 bg-card rounded-lg border border-border shadow-lg"
                >
                  <Mail className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-muted-foreground">abdulhamidhayredin94@gmail.com</div>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/ibnu-asma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card interactive-card flex items-center p-4 bg-card rounded-lg border border-border shadow-lg"
                >
                  <Linkedin className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <div className="font-medium text-foreground">LinkedIn</div>
                    <div className="text-muted-foreground">linkedin.com/in/ibnu-asma</div>
                  </div>
                </a>
                <a
                  href="https://github.com/ibnu-asma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card interactive-card flex items-center p-4 bg-card rounded-lg border border-border shadow-lg"
                >
                  <Github className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <div className="font-medium text-foreground">GitHub</div>
                    <div className="text-muted-foreground">github.com/ibnu-asma</div>
                  </div>
                </a>
                <a
                  href="/resume.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card interactive-card flex items-center p-4 bg-card rounded-lg border border-border shadow-lg"
                >
                  <Download className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <div className="font-medium text-foreground">Resume</div>
                    <div className="text-muted-foreground">View & Download</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Abdulhamid Hayredin.
            <span className="ml-2">
              System Status: <span className="text-success">All Systems Operational</span>
            </span>
          </p>
        </div>
      </footer>
    </div>
  )
}
