# Maven Agent Guide

## Purpose

Create new Maven Java projects outside the current repository using `mvn archetype:generate`.

## Pre-flight Check

**Fail immediately if running inside an existing git repo.** Ask the user to verify:

```bash
git rev-parse --git-dir
```

If output shows `.git`, abort and inform the user.

## Parameters to Ask User

1. **groupId** (required, string)
   - e.g., `com.example.myapp`

2. **artifactId** (required, string)
   - Project name
   - e.g., `myapp` → creates `myapp/` folder in current directory

3. **archetype** (required, string)
   - Suggest: `maven-archetype-quickstart`

4. **archetypeVersion** (required, string, default: `1.5`)

5. **jdkVersion** (optional, number)
   - Suggest: 25
   - e.g., 11, 17, 21

6. **submodules** (required, boolean)
   - If `true`:
     - Set `<packaging>pom</packaging>` in pom.xml
     - Add maven-compiler-plugin to set JDK version if jdkVersion is provided

7. **projectDescription** (required, string)
   - For README.md content

8. **package** (optional, string)
   - Use groupId as-is: e.g., `com.example.myapp`

## Implementation Order

1. Verify NOT in git repo → fail if yes
2. Ask user for all parameters
3. Call `createJava` tool
4. Tool will:
   - Run `mvn archetype:generate`
   - Create `.gitignore` with Maven + IntelliJ patterns
   - Create `README.md` with format:
     ```
     # <artifactId>

     <projectDescription>
     ```
   - If submodules=true:
     - Set packaging to `pom` in pom.xml
     - Add maven-compiler-plugin to set JDK version if provided
5. Display error if creation fails

## Error Handling

If any step fails, the tool will automatically remove all created files in the generated project folder.

## Examples

### Simple project (no submodules, no JDK)

```typescript
await createJava(
  "com.example.myapp",
  "myapp",
  "jar",
  "maven-archetype-quickstart",
  "1.5",
  0,  // 0 = no JDK version
  false,  // interactiveMode
  false,  // submodules
  "My Simple Maven Project"
)
```

### Modular project (submodules=pom, with JDK 21)

```typescript
await createJava(
  "com.example.myapp",
  "myapp",
  "pom",
  "maven-archetype-quickstart",
  "1.5",
  21,  // JDK 21
  false,  // interactiveMode
  true,  // submodules
  "My Modular Maven Project",
  "com.example.myapp"  // package
)
```

## Tool Location

The tool is defined in `/maven/tool/create_java.ts`.

## Maven Requirements

This agent requires:
- Maven in PATH
- Network access to download archetypes

## Maven Installation

If Maven is not installed in the user's path, inform the user and suggest installation:

```bash
sudo apt install maven  # Debian/Ubuntu
brew install maven      # macOS
```

After installation, verify:
```bash
mvn --version
```
