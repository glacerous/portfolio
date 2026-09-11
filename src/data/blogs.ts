export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: 'DevSecOps' | 'Backend' | 'Journey' | 'QA';
  readTime: string;
  summary: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'automating-devsecops-pipeline',
    title: 'Securing the Pipeline: Automated DevSecOps from Commit to Production',
    date: 'September 2026',
    category: 'DevSecOps',
    readTime: '5 min read',
    summary: 'How integrating automated SAST, dependency auditing, and container scanning into CI/CD workflows prevents vulnerabilities before they ever hit production.',
    tags: ['DevSecOps', 'CI/CD', 'Security', 'GitHub Actions', 'Docker'],
    content: `## The Problem with Post-Deployment Security

For years, security was treated as a toll gate right before deployment—or worse, as an afterthought after an incident in production. Developers would push features rapidly, and a security review would either stall release cycles or be bypassed under delivery pressure.

The core premise of **DevSecOps** is simple: push security left so vulnerabilities are detected during the development feedback loop rather than during a 2:00 AM production outage.

---

## 1. Multi-Stage Pipeline Architecture

A resilient automated delivery pipeline should treat security checks just like unit tests: if a check fails, the pipeline fails early.

Here is an architectural view of how we structure our validation gates:

\`\`\`yaml
name: DevSecOps CI Pipeline

on:
  push:
    branches: [ main, staging ]
  pull_request:
    branches: [ main ]

jobs:
  static-analysis:
    name: Code Quality & SAST
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Static Security Analysis (Semgrep)
        run: |
          semgrep scan --config=auto --error

  dependency-audit:
    name: Software Bill of Materials (SBOM) & CVE Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Vulnerability Audit
        run: |
          npm audit --audit-level=high

  container-security:
    name: Docker Image Scanning (Trivy)
    runs-on: ubuntu-latest
    needs: [static-analysis, dependency-audit]
    steps:
      - name: Build Container
        run: docker build -t app:latest .
      - name: Run Trivy Scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'app:latest'
          severity: 'CRITICAL,HIGH'
          exit-code: '1'
\`\`\`

---

## 2. Shift-Left Security in Practice

### Static Application Security Testing (SAST)
Running SAST tools directly in GitHub Actions ensures that patterns like SQL injection, improper error handling, or hardcoded secrets are caught before a pull request can be merged.

> **Key Rule:** Never allow secrets or production tokens in commit history. Use pre-commit hooks (like \`detect-secrets\` or \`gitleaks\`) on developer workstations as the first perimeter.

### Software Bill of Materials & Dependency Scanning
More than 80% of application code comes from open-source dependencies. Automated dependency scanning tools monitor known Common Vulnerabilities and Exposures (CVEs) and create automated pull requests to patch dependencies before exploits surface.

### Immutable Container Hardening
When packaging services into Docker images:
- Never run containers as \`root\`. Create an unprivileged user (\`USER node\` or \`USER appuser\`).
- Use minimal base images like Alpine or Distroless to minimize attack surface.
- Sign images using Cosign to guarantee origin authenticity.

---

## Conclusion

Security is not a single tool; it is a discipline baked into the delivery pipeline. By automating SAST, CVE scanning, and image verification, engineering teams can ship with high velocity without compromising system reliability or user trust.`
  },
  {
    id: '2',
    slug: 'from-roblox-lua-to-distributed-systems',
    title: 'From Roblox Studio Lua to Distributed Systems: How Building Games Taught Me to Architect Software',
    date: 'August 2026',
    category: 'Journey',
    readTime: '4 min read',
    summary: 'Reflecting on how scripting mechanics in Lua at 14 laid the foundation for understanding client-server replication, race conditions, and scalable backend architecture.',
    tags: ['Journey', 'Roblox', 'Lua', 'Architecture', 'Networking'],
    content: `## The 14-Year-Old Game Developer

When people ask how I started coding, they often expect me to say Computer Science class or a web bootcamp. The truth is much simpler: **I wanted to make my own games in Roblox Studio.**

At 14, Lua was my introduction to programming. I wasn't reading academic papers on distributed systems; I was trying to make sure a sword swung when a player clicked, or that coins saved when a player left the server.

Without realizing it, game development was teaching me the foundational concepts of modern distributed computing.

---

## 1. Client vs. Server Replication (The First Taste of Networking)

In Roblox, developers quickly confront **FilteringEnabled** (client-server network boundaries). If you modify a player's inventory on the client, the server doesn't replicate it—and for good reason: if the client could dictate game state, anyone could exploit and give themselves infinite health or money.

\`\`\`lua
-- Server Script (Authoritative State)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local purchaseEvent = ReplicatedStorage:WaitForChild("PurchaseItemEvent")

purchaseEvent.OnServerEvent:Connect(function(player, itemId)
    -- Never trust client-sent currency values!
    local playerCash = player:GetAttribute("Coins")
    local itemPrice = GetItemPrice(itemId)

    if playerCash >= itemPrice then
        player:SetAttribute("Coins", playerCash - itemPrice)
        GrantItem(player, itemId)
    else
        warn("Transaction rejected: Insufficient funds for player " .. player.Name)
    end
end)
\`\`\`

This taught me the golden rule of backend engineering and cyber security:
> **Never trust user input.** The server must remain the authoritative source of truth.

---

## 2. Race Conditions & Event-Driven Architecture

In game loops, events happen asynchronously. Player 1 and Player 2 might click an objective within 10 milliseconds of each other. If your state handler doesn't lock or atomically verify ownership, both players win—creating a classic race condition.

When I later transitioned into backend web development and dealt with database transactions, row-level locks, and message queues in Node.js and PostgreSQL, the concepts felt immediately familiar because I had already debugged them in multiplayer gaming environments years earlier.

---

## 3. From Mechanics to Infrastructure

What began as tinkering with Lua scripts eventually sparked my passion for:
- Understanding how packets flow across networks.
- How databases maintain consistency across concurrent transactions.
- How QA testing catches subtle edge cases before production release.

Every complex distributed system is ultimately built from fundamental primitives: state, messages, validation, and resilience.`
  },
  {
    id: '3',
    slug: 'robust-rest-apis-with-rbac-and-zod',
    title: 'Hardening Backend APIs: Schema Validation and RBAC in Modern Web Services',
    date: 'July 2026',
    category: 'Backend',
    readTime: '6 min read',
    summary: 'A deep dive into architecting resilient API endpoints using strict schema validation, role-based access control, and centralized error handling.',
    tags: ['Backend', 'TypeScript', 'Zod', 'PostgreSQL', 'Security'],
    content: `## Why Most APIs Fail in Production

The vast majority of backend bugs and vulnerabilities stem from two issues:
1. **Unsanitized or unexpected payload shapes** that bypass assumptions in service layers.
2. **Weak authorization checks** that check if a user is logged in, but fail to verify whether they actually have permission to touch a specific record (Broken Object Level Authorization / BOLA).

Let's look at how to build hardened, production-ready endpoints.

---

## 1. Enforcing Type Safety at the Runtime Edge with Zod

TypeScript types exist only at compile time; they evaporate once compiled to JavaScript. When a client sends a JSON payload to your server, TypeScript cannot save you from invalid types unless you validate the data at runtime.

\`\`\`typescript
import { z } from 'zod';

// Strict input contract
export const CreateDeploymentSchema = z.object({
  serviceName: z.string().min(3).max(64).regex(/^[a-z0-9-]+$/),
  targetEnvironment: z.enum(['staging', 'production']),
  replicaCount: z.number().int().min(1).max(20).default(1),
  tags: z.array(z.string()).max(10).optional(),
});

export type CreateDeploymentInput = z.infer<typeof CreateDeploymentSchema>;
\`\`\`

By validating request payloads with Zod right at the controller or route layer, invalid requests are rejected with a descriptive \`400 Bad Request\` before any database queries are ever fired.

---

## 2. Implementing Granular RBAC

Authentication answers **"Who are you?"**, while Authorization answers **"What are you allowed to do?"**.

Role-Based Access Control (RBAC) maps permissions to roles, and roles to users. Here is a pattern for enforcing RBAC in middleware:

\`\`\`typescript
export type Permission = 
  | 'deploy:read' 
  | 'deploy:write' 
  | 'deploy:rollback' 
  | 'cluster:admin';

export const RolePermissions: Record<string, Permission[]> = {
  viewer: ['deploy:read'],
  developer: ['deploy:read', 'deploy:write'],
  lead_engineer: ['deploy:read', 'deploy:write', 'deploy:rollback'],
  admin: ['deploy:read', 'deploy:write', 'deploy:rollback', 'cluster:admin'],
};

export function requirePermission(permission: Permission) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user.role;
    const permissions = RolePermissions[userRole] || [];

    if (!permissions.includes(permission)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: \`Missing required permission: \${permission}\`,
      });
    }

    next();
  };
}
\`\`\`

---

## 3. Database Layer: Defending Against IDOR & BOLA

Even with RBAC in place, always scope queries by tenant or organization ID:

\`\`\`typescript
// VULNERABLE: Any authenticated user can mutate another team's deployment
await prisma.deployment.update({
  where: { id: deploymentId },
  data: { status: 'TERMINATED' },
});

// HARDENED: Scoped to user's assigned organization
await prisma.deployment.update({
  where: {
    id: deploymentId,
    organizationId: req.user.organizationId, // Enforce boundary
  },
  data: { status: 'TERMINATED' },
});
\`\`\`

---

## Summary

Hardening backend services doesn't require reinventing the wheel. Combining runtime schema contracts, clear authorization matrices, and tenant-scoped database queries creates an API layer that is reliable, secure, and easy to maintain.`
  }
];
