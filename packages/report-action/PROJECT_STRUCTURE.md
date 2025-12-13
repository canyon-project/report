# Canyon Report Action - 项目结构

## 📁 目录结构

```
packages/report-action/
├── action.yml                 # GitHub Action 配置
├── package.json              # Node.js 项目配置
├── tsconfig.json             # TypeScript 配置
├── vitest.config.ts          # 测试配置
├── README.md                 # 项目文档
├── .gitignore               # Git 忽略文件
├── src/                     # 源代码
│   ├── index.ts             # 入口文件
│   ├── env.ts               # 环境检测
│   ├── github-pr.ts         # PR 模式处理
│   ├── git-diff.ts          # Commit 模式处理
│   ├── patch-schema.ts      # Patch 数据结构
│   ├── write-output.ts      # 输出处理
│   └── index.test.ts        # 单元测试
├── examples/                # 示例文件
│   ├── pr-example.json      # PR 模式示例输出
│   ├── commit-example.json  # Commit 模式示例输出
│   └── usage.yml            # 使用示例 workflow
├── scripts/                 # 构建脚本
│   ├── build.sh             # 构建脚本
│   ├── test-local.js        # 本地测试
│   └── prepare-release.sh   # 发布准备
├── .github/workflows/       # CI/CD
│   └── test.yml             # 测试 workflow
└── dist/                    # 构建输出（需要构建后生成）
    └── index.js             # 打包后的入口文件
```

## 🚀 快速开始

### 1. 安装依赖
```bash
cd packages/report-action
npm install
```

### 2. 构建项目
```bash
npm run build
# 或使用脚本
./scripts/build.sh
```

### 3. 运行测试
```bash
npm test
```

### 4. 本地测试
```bash
node scripts/test-local.js
```

## 📋 核心功能

### ✅ 已实现
- 自动检测 PR/commit 模式
- GitHub API 获取 PR diff
- Git 命令获取 commit diff  
- 标准 patch.json 输出格式
- 完整的 TypeScript 类型定义
- 单元测试覆盖
- 示例和文档

### 🎯 设计原则
- 职责单一：只生成 patch.json
- 接口简洁：90% 用户零配置
- 格式标准：v1 schema 向后兼容
- 易于扩展：模块化架构

## 🔄 工作流程

1. **模式检测** (`env.ts`)
   - auto: 根据 GITHUB_EVENT_NAME 自动判断
   - pr: 强制使用 PR 模式
   - commit: 强制使用 commit 模式

2. **数据获取**
   - PR 模式: GitHub API (`github-pr.ts`)
   - Commit 模式: git diff 命令 (`git-diff.ts`)

3. **数据处理** (`patch-schema.ts`)
   - 统一文件状态映射
   - 生成标准 v1 schema

4. **输出写入** (`write-output.ts`)
   - 写入 patch.json 文件
   - 设置 GitHub Action 输出

## 📦 发布流程

1. 运行 `./scripts/prepare-release.sh`
2. 提交 `dist/index.js` 到 git
3. 创建 git tag (如 `v1.0.0`)
4. 推送 tag 并创建 GitHub release

## 🔗 集成示例

```yaml
- uses: canyonjs/report-action@v1
  id: patch
- run: canyon-report --patch ${{ steps.patch.outputs.patch }}
```