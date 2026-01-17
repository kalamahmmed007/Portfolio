import React, { useState, useEffect } from 'react';
import { 
  Upload, File, FileText, Image, Video, Music, 
  Download, Trash2, Eye, Search, Filter, Grid, 
  List, Folder, X, Check, Loader, RefreshCw,
  MoreVertical, Calendar, HardDrive
} from 'lucide-react';


export default function FileManager() {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileTypes = ['All', 'Image', 'Video', 'Document', 'Audio', 'Other'];

  // Fetch files on mount
  useEffect(() => {
    fetchFiles();
  }, []);

  // Filter files
  useEffect(() => {
    filterFilesList();
  }, [searchQuery, filterType, files]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://your-api-endpoint.com/api/files', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${yourAuthToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }

      const data = await response.json();
      setFiles(data);
      console.log('Files loaded:', data);

    } catch (error) {
      console.error('Error fetching files:', error);
      alert('Failed to load files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterFilesList = () => {
    let filtered = [...files];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'All') {
      filtered = filtered.filter(file => file.type === filterType);
    }

    setFilteredFiles(filtered);
  };

  const handleFileUpload = async (event) => {
    const uploadedFiles = Array.from(event.target.files);
    
    if (uploadedFiles.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const formData = new FormData();
        formData.append('file', file);

        // Simulate progress
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => Math.min(prev + 10, 90));
        }, 200);

        const response = await fetch('https://your-api-endpoint.com/api/files/upload', {
          method: 'POST',
          headers: {
            // Don't set Content-Type for FormData
            // 'Authorization': `Bearer ${yourAuthToken}`
          },
          body: formData
        });

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        const data = await response.json();
        setFiles(prev => [...prev, data]);
      }

      alert('File(s) uploaded successfully!');
      event.target.value = ''; // Reset input

    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (fileId) => {
    if (!confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      const response = await fetch(`https://your-api-endpoint.com/api/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${yourAuthToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      setFiles(files.filter(f => f.id !== fileId));
      setSelectedFile(null);
      alert('File deleted successfully!');

    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file. Please try again.');
    }
  };

  const handleDownload = async (file) => {
    try {
      const response = await fetch(`https://localhost:5173/api/files/${file.id}/download`, {
        method: 'GET',
        headers: {
          // 'Authorization': `Bearer ${yourAuthToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const getFileIcon = (fileType) => {
    const icons = {
      'Image': <Image className="h-8 w-8" />,
      'Video': <Video className="h-8 w-8" />,
      'Document': <FileText className="h-8 w-8" />,
      'Audio': <Music className="h-8 w-8" />,
      'Other': <File className="h-8 w-8" />
    };
    return icons[fileType] || icons['Other'];
  };

  const getFileTypeColor = (fileType) => {
    const colors = {
      'Image': 'bg-blue-100 text-blue-700 border-blue-200',
      'Video': 'bg-purple-100 text-purple-700 border-purple-200',
      'Document': 'bg-green-100 text-green-700 border-green-200',
      'Audio': 'bg-orange-100 text-orange-700 border-orange-200',
      'Other': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[fileType] || colors['Other'];
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const FileCardGrid = ({ file }) => (
    <div 
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-red-500 hover:shadow-md"
      onClick={() => setSelectedFile(file)}
    >
      {/* File Preview/Icon */}
      <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gray-50">
        {file.type === 'Image' && file.url ? (
          <img 
            src={file.url} 
            alt={file.name}
            className="h-full w-full rounded-lg object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="text-gray-400">' + getFileIcon(file.type) + '</div>';
            }}
          />
        ) : (
          <div className="text-gray-400">
            {getFileIcon(file.type)}
          </div>
        )}
      </div>

      {/* File Info */}
      <div className="mb-3">
        <h3 className="mb-1 truncate font-semibold text-gray-900" title={file.name}>
          {file.name}
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>{formatFileSize(file.size)}</span>
          <span className={`px-2 py-0.5 rounded border ${getFileTypeColor(file.type)}`}>
            {file.type}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload(file);
          }}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-500 hover:text-white"
        >
          <Download className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(file.id);
          }}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-500 hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const FileListItem = ({ file }) => (
    <div 
      className="flex cursor-pointer items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-red-500"
      onClick={() => setSelectedFile(file)}
    >
      {/* Icon */}
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50">
        <div className="text-gray-400">
          {getFileIcon(file.type)}
        </div>
      </div>

      {/* File Info */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-gray-900">{file.name}</h3>
        <div className="mt-1 flex items-center gap-3 text-xs text-gray-600">
          <span>{formatFileSize(file.size)}</span>
          <span>•</span>
          <span>{formatDate(file.uploadedAt)}</span>
          <span className={`px-2 py-0.5 rounded border ${getFileTypeColor(file.type)}`}>
            {file.type}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload(file);
          }}
          className="flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-500 hover:text-white"
        >
          <Download className="h-4 w-4" />
          Download
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(file.id);
          }}
          className="flex items-center gap-1 rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-500 hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">File Manager</h1>
              <p className="text-gray-600">Upload, manage and organize your files</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchFiles}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 font-medium text-white transition-colors hover:bg-red-500">
                <Upload className="h-5 w-5" />
                Upload Files
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="mb-2 flex items-center gap-3">
              <Loader className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">Uploading files... {uploadProgress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-blue-200">
              <div 
                className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-red-500">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search files..."
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {fileTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Grid className="mx-auto h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <List className="mx-auto h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-red-500">
            <p className="mb-1 text-sm text-gray-600">Total Files</p>
            <p className="text-2xl font-bold text-gray-900">{files.length}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-red-500">
            <p className="mb-1 text-sm text-gray-600">Total Size</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatFileSize(files.reduce((acc, file) => acc + (file.size || 0), 0))}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-red-500">
            <p className="mb-1 text-sm text-gray-600">Images</p>
            <p className="text-2xl font-bold text-gray-900">
              {files.filter(f => f.type === 'Image').length}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-red-500">
            <p className="mb-1 text-sm text-gray-600">Documents</p>
            <p className="text-2xl font-bold text-gray-900">
              {files.filter(f => f.type === 'Document').length}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader className="h-8 w-8 animate-spin text-red-500" />
            <span className="ml-3 text-gray-600">Loading files...</span>
          </div>
        )}

        {/* Files Grid/List */}
        {!loading && filteredFiles.length > 0 && (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
              : 'space-y-3'
          }>
            {filteredFiles.map(file => (
              viewMode === 'grid'
                ? <FileCardGrid key={file.id} file={file} />
                : <FileListItem key={file.id} file={file} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredFiles.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Folder className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">No files found</h3>
            <p className="mb-4 text-gray-600">
              {searchQuery || filterType !== 'All'
                ? 'Try adjusting your search or filters'
                : 'Upload your first file to get started'}
            </p>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-500">
              <Upload className="h-5 w-5" />
              Upload Files
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* File Details Modal */}
        {selectedFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white">
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">File Details</h2>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {/* File Preview */}
                {selectedFile.type === 'Image' && selectedFile.url && (
                  <div className="mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img 
                      src={selectedFile.url} 
                      alt={selectedFile.name}
                      className="max-h-96 w-full object-contain"
                    />
                  </div>
                )}

                {/* File Info */}
                <div className="mb-6 space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">File Name</label>
                    <p className="text-gray-900">{selectedFile.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Type</label>
                      <p className="text-gray-900">{selectedFile.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Size</label>
                      <p className="text-gray-900">{formatFileSize(selectedFile.size)}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Uploaded</label>
                    <p className="text-gray-900">{formatDate(selectedFile.uploadedAt)}</p>
                  </div>
                  {selectedFile.url && (
                    <div>
                      <label className="text-sm font-semibold text-gray-700">URL</label>
                      <p className="break-all text-sm text-gray-900">{selectedFile.url}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownload(selectedFile)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-100 px-4 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-500 hover:text-white"
                  >
                    <Download className="h-5 w-5" />
                    Download
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(selectedFile.id);
                      setSelectedFile(null);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-100 px-4 py-3 font-semibold text-red-600 transition-colors hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="h-5 w-5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Integration Note */}
        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold text-blue-900">Backend Integration</h3>
          <p className="mb-2 text-sm text-blue-700">Update the API endpoints in the code:</p>
          <code className="mb-1 block rounded bg-blue-100 p-2 text-xs text-blue-900">
            POST: /api/files/upload (FormData with 'file' field)
          </code>
          <code className="mb-1 block rounded bg-blue-100 p-2 text-xs text-blue-900">
            GET: /api/files (Get all files)
          </code>
          <code className="mb-1 block rounded bg-blue-100 p-2 text-xs text-blue-900">
            GET: /api/files/:id/download (Download file)
          </code>
          <code className="block rounded bg-blue-100 p-2 text-xs text-blue-900">
            DELETE: /api/files/:id (Delete file)
          </code>
        </div>
      </div>
    </div>
  );
}