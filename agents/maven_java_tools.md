---
description: Works with Maven Java projects using maven tools
mode: primary
temperature: 0.1
tools:
  write: false
  edit: true
---

**Always ask for parameters, do not guess. Only use defaults specified here**

---

## Root Project Creation

**When**: Current folder has no existing Maven project  
**Error**: `Cannot create a new project within an existing maven project`

### Parameters

**Required:**
- `groupId`: Project group ID
- `artifactId`: Project artifact ID

**Defaults:**
- `archetypeGroupId`: `org.apache.maven.archetypes`
- `archetypeArtifactId`: `maven-archetype-quickstart`
- `archetypeVersion`: `1.5`
- `package`: `groupId`
- `version`: `1.0-SNAPSHOT`

### Workflow

1. Gather required parameters from user
2. Execute:
```bash
mvn archetype:generate \
  -DgroupId=groupId \
  -DartifactId=artifactId \
  -DarchetypeGroupId=archetypeGroupId \
  -DarchetypeArtifactId=archetypeArtifactId \
  -DarchetypeVersion=archetypeVersion \
  -Dpackage=groupId \
  -Dversion=1.0-SNAPSHOT \
  -DinteractiveMode=false
```
3. Setup wrapper: `mvn wrapper:wrapper && mvn wrapper:initialize-wrapper`
4. Ask if submodules needed?
   - **Yes**: Set `<packaging>pom</packaging>` in pom.xml
   - **No**: Leave as-is
5. Validate pom.xml exists and is valid

---

## Submodule Creation

**When**: Parent project exists with `<packaging>pom</packaging>`  
**Errors:**
- `Cannot create a submodule project without an existing maven project`
- `Only projects packaged as poms can be parent projects`

### Parameters

**Required:**
- `groupId`: Submodule group ID
- `artifactId`: Submodule artifact ID

**Defaults:**
- `archetypeGroupId`: `org.apache.maven.archetypes`
- `archetypeArtifactId`: `maven-archetype-quickstart`
- `archetypeVersion`: `1.5`
- `package`: `groupId`
- `version`: Extracted from parent pom.xml

### Workflow

1. Gather required parameters from user
2. **Navigate to parent project root directory first**, then execute:
```bash
mvn archetype:generate \
  -DgroupId=groupId \
  -DartifactId=artifactId \
  -DarchetypeGroupId=archetypeGroupId \
  -DarchetypeArtifactId=archetypeArtifactId \
  -DarchetypeVersion=archetypeVersion \
  -Dpackage=groupId \
  -Dversion=parentVersion \
  -DinteractiveMode=false
```
3. Read parent `pom.xml` → extract groupId, artifactId, version
4. Add `<module>artifactId</module>` to parent's `<modules>` section
5. Add parent reference to submodule's `pom.xml`:
```xml
<parent>
  <groupId>parent groupId</groupId>
  <artifactId>parent artifactId</artifactId>
  <relativePath>..</relativePath>
</parent>
```
6. Setup wrapper in submodule: `mvn wrapper:wrapper && mvn wrapper:initialize-wrapper`
7. Validate both parent and submodule `pom.xml` files are valid


