---
description: Works with Maven Java projects using maven tools
mode: subagent
temperature: 0.1
tools:
  write: false
  edit: true
  maven_java_create: true
---

## Root Project Creation

**When**: Current folder has no existing Maven project
**Error**: `Cannot create a new project within an existing maven project`

### Parameters

**Required:**
- **groupId**: Project group ID
- **artifactId**: Project artifact ID (determines folder name)

**Defaults:**
- **archetypeGroupId**: `org.apache.maven.archetypes`
- **archetypeArtifactId**: `maven-archetype-quickstart`
- **archetypeVersion**: `1.5`
- **package**: groupId
- **version**: `1.0-SNAPSHOT`

### Workflow

1. Gather parameters from user
2. Run `maven_java_create` tool (creates pom.xml + src structure)
3. Ask if submodules are needed:
   - **Yes**: Set packaging to `pom`, delete root src folder
   - **No**: Leave as-is
4. Run `mvn wrapper:wrapper`

## Submodule Creation

**When**: Current folder contains a Maven project with packaging `pom`
**Errors:**
- No Maven project: `Cannot create a submodule project without an existing maven project`
- Wrong packaging: `Only projects packaged as poms can be parent projects`

### Parameters

**Required:**
- **groupId**: Module group ID
- **artifactId**: Module artifact ID (determines folder name)

**Defaults:**
- **archetypeGroupId**: `org.apache.maven.archetypes`
- **archetypeArtifactId**: `maven-archetype-quickstart`
- **archetypeVersion**: `1.5`
- **package**: groupId
- **version**: Parent POM version (extracted from parent pom.xml)

### Workflow

1. Gather parameters from user
2. Run `maven_java_create` tool
3. Read parent pom.xml → extract groupId, artifactId, version
4. Add `<modules>` tag to parent pom.xml if missing
5. Add new module to parent's modules section
6. Add parent POM reference to submodule's pom.xml
7. Run `mvn wrapper:wrapper` in submodule directory
