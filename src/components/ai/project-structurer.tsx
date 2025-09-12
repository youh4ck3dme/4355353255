'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { UploadCloud, File as FileIcon, X, Loader } from 'lucide-react';
import { Progress } from '../ui/progress';
import { generateProjectStructure } from '@/ai/flows/generate-project-structure';
import type { GenerateProjectStructureInput } from '@/ai/flows/generate-project-structure';
import { useToast } from '@/hooks/use-toast';

// Helper to read file as Data URI
const readFileAsDataURI = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};


export function ProjectStructurer() {
  const [files, setFiles] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        progress: 0,
      })
    );
    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      let progress = 0;
      const timer = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(timer);
        }
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.path === file.path ? { ...f, progress } : f
          )
        );
      }, 200);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });
  
  const removeFile = (path: string) => {
    setFiles(files.filter(f => f.path !== path));
  }

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult('');
    try {
        const fileDescriptions = await Promise.all(
            files.map(async (file) => ({
                filename: file.name,
                dataUri: await readFileAsDataURI(file),
            }))
        );

        const input: GenerateProjectStructureInput = {
            projectName: "My New Project",
            fileDescriptions: fileDescriptions,
        };

        const response = await generateProjectStructure(input);
        setResult(response.projectStructure);

    } catch (error) {
        console.error("Failed to generate project structure:", error);
        toast({
            title: 'Chyba',
            description: 'Nepodarilo sa vygenerovať štruktúru projektu.',
            variant: 'destructive',
        });
    } finally {
        setIsGenerating(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <Card>
          <CardContent className="p-6">
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent
              ${isDragActive ? 'border-primary bg-accent' : 'border-border'}`}
            >
              <input {...getInputProps()} />
              <UploadCloud className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-center text-muted-foreground">
                {isDragActive ? 'Drop the files here ...' : 'Drag & drop some files here, or click to select files'}
              </p>
            </div>
          </CardContent>
        </Card>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">Uploaded Files</h3>
            {files.map((file) => (
              <Card key={file.path}>
                <CardContent className="p-3 flex items-center gap-4">
                  <FileIcon className="h-6 w-6 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{file.name}</p>
                    <Progress value={file.progress} className="h-2 mt-1" />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(file.path)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <Button onClick={handleGenerate} disabled={files.length === 0 || isGenerating} className="mt-6 w-full">
            {isGenerating ? <><Loader className="animate-spin mr-2"/>Generating...</> : 'Generate Project Structure'}
        </Button>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Generated Structure</h3>
        <Card className="min-h-[300px] bg-muted/50">
            <CardContent className="p-6">
                {isGenerating ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader className="animate-spin mr-2"/>
                        AI is thinking...
                    </div>
                ) : result ? (
                    <pre className="text-sm bg-background p-4 rounded-md overflow-x-auto"><code>{result}</code></pre>
                ) : (
                    <p className="text-muted-foreground">The generated project structure will appear here.</p>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
