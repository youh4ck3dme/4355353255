import { ProjectStructurer } from "@/components/ai/project-structurer";

export default function AiStructurerPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">AI Project Structurer</h1>
            <p className="text-muted-foreground mb-6">Upload your project files and let our AI generate a complete project structure with readmes and previews.</p>
            <ProjectStructurer />
        </div>
    )
}
