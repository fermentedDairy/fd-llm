import { tool } from "@opencode-ai/plugin"

export const java_create({
  description: "create a java maven project",
  args: {
    archetypeGroupId = tool.schema.string().describe("Archetype Group Id").default("org.apache.maven.archetypes"),
    archetypeArtifactId = tool.schema.string().describe("Archetype Artifact Id").default("maven-archetype-quickstart"),
    archetypeVersion = tool.schema.string().describe("Archetype Version").default("1.5"),
    groupId = tool.schema.string().describe("Group Id for the project"),
    artifactId = tool.schema.string.describe("the artifact Id"),
    package = tool.schema.string.describe("The projects base package"),
    version = tool.schema.string.describe("The initial version to use for the project").default("1.0-SNAPSHOT"),
  },
  async execute(args) {
    const archetypeGroupId = args.archetypeGroupId
    const archetypeArtifactId = args.archetypeArtifactId
    const archetypeVersion = args.archetypeVersion
    const groupId = args.groupId
    const artifactId = args.artifactId
    const version = args.version
    const package = args.package

    return await Bun.$`mvn archetype:generate \
        -DarchetypeGroupId=${archetypeGroupId} \
        -DarchetypeArtifactId=${archetypeArtifactId} \
        -DarchetypeVersion=${archetypeVersion} \
        -DgroupId=${groupId} \
        -DartifactId=${artifactId} \
        -Dversion=${version} \
        -Dpackage=${package}`.text()
  },
})