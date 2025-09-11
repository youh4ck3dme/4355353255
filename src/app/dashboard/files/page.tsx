import { FileBrowser } from "@/components/files/file-browser";

export default function FilesPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Cloud Storage</h1>
            <FileBrowser />
        </div>
    )
}
