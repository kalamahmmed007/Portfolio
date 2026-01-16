// src/pages/Settings/SiteSettings.jsx
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { 
  Globe, Save, Loader, Upload, Image as ImageIcon, 
  Search, Mail, Phone, MapPin, AlertCircle, Check,
  Settings as SettingsIcon, Palette, Code, Eye
} from "lucide-react";

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "",
    tagline: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    logo: "",
    favicon: "",
    seoTitle: "",
    seoDescription: "",
    keywords: "",
    ogImage: "",
    googleAnalytics: "",
    maintenanceMode: false,
    allowRegistration: true,
    theme: "light"
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);
  const [ogImagePreview, setOgImagePreview] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings/site");
        setSettings(res.data);
        setLogoPreview(res.data.logo);
        setFaviconPreview(res.data.favicon);
        setOgImagePreview(res.data.ogImage);
      } catch (err) {
        console.error(err);
        alert("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setSettings(prev => ({ ...prev, [field]: result }));
        
        if (field === "logo") setLogoPreview(result);
        if (field === "favicon") setFaviconPreview(result);
        if (field === "ogImage") setOgImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/settings/site", settings);
      alert("Site settings updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update site settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
          <Globe className="h-8 w-8 text-blue-600" />
          Site Settings
        </h1>
        <p className="mt-2 text-gray-600">Configure your website's general settings and appearance</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Information */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <SettingsIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">General Information</h2>
              <p className="text-sm text-gray-600">Basic information about your website</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Site Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Site Name *
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="My Portfolio"
              />
            </div>

            {/* Tagline */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={settings.tagline}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Building amazing things"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Site Description
              </label>
              <textarea
                name="description"
                value={settings.description}
                onChange={handleChange}
                rows="3"
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="A brief description of your website..."
              />
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-2">
              <Palette className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Branding</h2>
              <p className="text-sm text-gray-600">Upload your logo and favicon</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Logo */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Site Logo
              </label>
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition hover:border-blue-500">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="mx-auto mb-3 h-24 object-contain" />
                ) : (
                  <ImageIcon className="mx-auto mb-3 h-16 w-16 text-gray-400" />
                )}
                <label className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "logo")}
                    className="hidden"
                  />
                  Upload Logo
                </label>
              </div>
            </div>

            {/* Favicon */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Favicon
              </label>
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition hover:border-blue-500">
                {faviconPreview ? (
                  <img src={faviconPreview} alt="Favicon" className="mx-auto mb-3 h-24 object-contain" />
                ) : (
                  <ImageIcon className="mx-auto mb-3 h-16 w-16 text-gray-400" />
                )}
                <label className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "favicon")}
                    className="hidden"
                  />
                  Upload Favicon
                </label>
                <p className="mt-2 text-xs text-gray-500">32x32 PNG</p>
              </div>
            </div>

            {/* OG Image */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Social Share Image
              </label>
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition hover:border-blue-500">
                {ogImagePreview ? (
                  <img src={ogImagePreview} alt="OG" className="mx-auto mb-3 h-24 object-contain" />
                ) : (
                  <ImageIcon className="mx-auto mb-3 h-16 w-16 text-gray-400" />
                )}
                <label className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "ogImage")}
                    className="hidden"
                  />
                  Upload Image
                </label>
                <p className="mt-2 text-xs text-gray-500">1200x630 PNG</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
              <p className="text-sm text-gray-600">Your contact details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="contact@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full resize-none rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Main Street, City, Country"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-orange-100 p-2">
              <Search className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">SEO Settings</h2>
              <p className="text-sm text-gray-600">Optimize your site for search engines</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* SEO Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                SEO Title
              </label>
              <input
                type="text"
                name="seoTitle"
                value={settings.seoTitle}
                onChange={handleChange}
                maxLength="60"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Your site title for search engines"
              />
              <p className="mt-1 text-xs text-gray-500">
                {settings.seoTitle.length}/60 characters
              </p>
            </div>

            {/* SEO Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Meta Description
              </label>
              <textarea
                name="seoDescription"
                value={settings.seoDescription}
                onChange={handleChange}
                maxLength="160"
                rows="3"
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="A brief description for search results..."
              />
              <p className="mt-1 text-xs text-gray-500">
                {settings.seoDescription.length}/160 characters
              </p>
            </div>

            {/* Keywords */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                name="keywords"
                value={settings.keywords}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="portfolio, developer, design, web"
              />
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-red-100 p-2">
              <Code className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Advanced Settings</h2>
              <p className="text-sm text-gray-600">Additional configuration options</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Google Analytics */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Google Analytics ID
              </label>
              <input
                type="text"
                name="googleAnalytics"
                value={settings.googleAnalytics}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="G-XXXXXXXXXX"
              />
            </div>

            {/* Theme */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Default Theme
              </label>
              <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-4">
              {/* Maintenance Mode */}
              <div className="flex items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-gray-800">Maintenance Mode</p>
                    <p className="text-sm text-gray-600">Put your site under maintenance</p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-yellow-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                </label>
              </div>

              {/* Allow Registration */}
              <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">Allow Registration</p>
                    <p className="text-sm text-gray-600">Enable new user registration</p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    name="allowRegistration"
                    checked={settings.allowRegistration}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <Eye className="mr-2 inline h-5 w-5" />
            Preview
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {saving ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SiteSettings;