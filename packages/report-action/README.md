# Canyon Report Action

Canyon 官方"变更感知入口" - 专注于生成标准 patch.json 文件，为覆盖率分析提供变更信息。

## 🎯 功能定位

- ✅ 自动判断 PR / commit
- ✅ 获取 diff（GitHub API / git diff）
- ✅ 输出标准 patch.json
- ❌ 不解析 AST
- ❌ 不计算覆盖率
- ❌ 不关心 UI

## 🚀 使用方式

### 最简单（90% 用户）

```yaml
- uses: canyonjs/report-action@v1
```

### 稍微可控

```yaml
- uses: canyonjs/report-action@v1
  with:
    mode: auto        # auto | pr | commit
    output: canyon.patch.json
```

### 高级 / 私有化 / 非 GitHub

```yaml
- uses: canyonjs/report-action@v1
  with:
    mode: commit
    base: HEAD~1
    head: HEAD
```

## 📝 输入参数

| 参数 | 描述 | 必需 | 默认值 |
|------|------|------|--------|
| `mode` | 检测模式: `auto` \| `pr` \| `commit` | 否 | `auto` |
| `base` | 基准 ref（可选） | 否 | - |
| `head` | 目标 ref（可选） | 否 | - |
| `output` | patch.json 输出路径 | 否 | `canyon.patch.json` |

## 📤 输出

| 参数 | 描述 |
|------|------|
| `patch` | 生成的 patch.json 文件路径 |

## 📋 patch.json 格式

```json
{
  "version": 1,
  "provider": "github",
  "event": "pull_request",
  "base": "main",
  "head": "abc123",
  "files": [
    {
      "path": "src/a.ts",
      "status": "modified",
      "patch": "@@ -10,6 +10,9 @@\n+foo()\n"
    }
  ],
  "generatedAt": "2025-12-13T09:00:00Z"
}
```

## 🔗 与其他工具配合

```yaml
- uses: canyonjs/report-action@v1
  id: diff
- run: canyon-report --patch ${{ steps.diff.outputs.patch }}
```

## 📄 License

MIT