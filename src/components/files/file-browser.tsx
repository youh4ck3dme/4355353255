'use client';

import * as React from 'react';
import { files } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, File, Folder, Download, Edit, Trash2, FileArchive, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';

export function FileBrowser() {
  const { toast } = useToast();
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelected(files.map((file) => file.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelected((prev) => [...prev, id]);
    } else {
      setSelected((prev) => prev.filter((fileId) => fileId !== id));
    }
  };

  const isAllSelected = selected.length === files.length;
  const isSomeSelected = selected.length > 0 && !isAllSelected;
  const selectAllState = isAllSelected ? true : isSomeSelected ? 'indeterminate' : false;
  
  const handleAction = (action: string) => {
    toast({
      title: 'Action Triggered',
      description: `${action} on selected items.`,
    });
  }

  return (
    <Card>
      <div className="flex items-center gap-4 p-4 border-b">
         <div className="flex-1">
          {selected.length > 0 ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleAction('Download as ZIP')}>
                <FileArchive className="mr-2 h-4 w-4" />
                Download as ZIP ({selected.length})
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleAction('Delete')}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete ({selected.length})
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
                 <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Upload
                </Button>
                <Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Folder
                </Button>
            </div>
          )}
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox
                checked={selectAllState}
                onCheckedChange={handleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Modified</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell>
                <Checkbox
                  checked={selected.includes(file.id)}
                  onCheckedChange={(checked) => handleSelect(file.id, !!checked)}
                  aria-label={`Select ${file.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {file.type === 'folder' ? (
                    <Folder className="h-4 w-4 text-primary" />
                  ) : (
                    <File className="h-4 w-4 text-muted-foreground" />
                  )}
                  {file.name}
                </div>
              </TableCell>
              <TableCell>{file.owner}</TableCell>
              <TableCell>{file.size}</TableCell>
              <TableCell>{file.modified}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleAction('Preview')}>Preview</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('Rename')}><Edit className="mr-2 h-4 w-4" />Rename</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('Download')}><Download className="mr-2 h-4 w-4" />Download</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => handleAction('Delete')}><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

// We need a card component for this to look good. I'll just use a div for now with border.
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-card rounded-lg border shadow-sm ${className}`}>
        {children}
    </div>
)
