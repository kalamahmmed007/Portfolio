// src/pages/Settings/Security.jsx
import { useState } from "react";
import { api } from "../../services/api";
import { 
  Lock, Eye, EyeOff, Shield, Key, CheckCircle, 
  AlertTriangle, Smartphone, Monitor, Save, Loader 
} from "lucide-react";

const Security = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, text: "Very Weak", color: "bg-red-500" },
      { strength: 1, text: "Weak", color: "bg-orange-500" },
      { strength: 2, text: "Fair", color: "bg-yellow-500" },
      { strength: 3, text: "Good", color: "bg-blue-500" },
      { strength: 4, text: "Strong", color: "bg-green-500" },
      { strength: 5, text: "Very Strong", color: "bg-green-600" },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(newPassword);

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    if (currentPassword === newPassword) {
      alert("New password must be different from current password!");
      return;
    }

    setLoading(true);
    try {
      await api.put("/settings/security", { currentPassword, newPassword });
      alert("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  // Handle 2FA toggle
  const handleToggle2FA = async () => {
    try {
      const newState = !twoFactorEnabled;
      await api.put("/settings/two-factor", { enabled: newState });
      setTwoFactorEnabled(newState);
      alert(`Two-factor authentication ${newState ? "enabled" : "disabled"}!`);
    } catch (err) {
      console.error(err);
      alert("Failed to update two-factor authentication");
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
          <Shield className="h-8 w-8 text-blue-600" />
          Security Settings
        </h1>
        <p className="mt-2 text-gray-600">Manage your account security and password</p>
      </div>

      {/* Change Password Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-2">
            <Key className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
            <p className="text-sm text-gray-600">Update your password regularly to keep your account secure</p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-12 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-12 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="mt-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Password Strength:</span>
                  <span className={`text-sm font-semibold ${
                    passwordStrength.strength >= 4 ? "text-green-600" : 
                    passwordStrength.strength >= 3 ? "text-blue-600" : 
                    passwordStrength.strength >= 2 ? "text-yellow-600" : "text-red-600"
                  }`}>
                    {passwordStrength.text}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full transition-all ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Password Requirements */}
            <div className="mt-4 rounded-lg bg-gray-50 p-4">
              <p className="mb-2 text-sm font-medium text-gray-700">Password must contain:</p>
              <ul className="space-y-1">
                <li className={`text-sm flex items-center gap-2 ${newPassword.length >= 8 ? "text-green-600" : "text-gray-500"}`}>
                  <CheckCircle className="h-4 w-4" />
                  At least 8 characters
                </li>
                <li className={`text-sm flex items-center gap-2 ${/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? "text-green-600" : "text-gray-500"}`}>
                  <CheckCircle className="h-4 w-4" />
                  Both uppercase and lowercase letters
                </li>
                <li className={`text-sm flex items-center gap-2 ${/\d/.test(newPassword) ? "text-green-600" : "text-gray-500"}`}>
                  <CheckCircle className="h-4 w-4" />
                  At least one number
                </li>
                <li className={`text-sm flex items-center gap-2 ${/[^a-zA-Z0-9]/.test(newPassword) ? "text-green-600" : "text-gray-500"}`}>
                  <CheckCircle className="h-4 w-4" />
                  At least one special character
                </li>
              </ul>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-12 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
                <AlertTriangle className="h-4 w-4" />
                Passwords do not match
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-medium text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Updating Password...</span>
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                <span>Update Password</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-green-100 p-2">
            <Smartphone className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Two-Factor Authentication</h2>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <Shield className={`w-6 h-6 ${twoFactorEnabled ? "text-green-600" : "text-gray-400"}`} />
            <div>
              <p className="font-medium text-gray-800">
                Two-Factor Authentication is {twoFactorEnabled ? "Enabled" : "Disabled"}
              </p>
              <p className="text-sm text-gray-600">
                {twoFactorEnabled 
                  ? "Your account is protected with 2FA" 
                  : "Enable 2FA for enhanced security"}
              </p>
            </div>
          </div>
          <button
            onClick={handleToggle2FA}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              twoFactorEnabled ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                twoFactorEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-purple-100 p-2">
            <Monitor className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Active Sessions</h2>
            <p className="text-sm text-gray-600">Manage your active login sessions</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Current Session */}
          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-800">Current Device</p>
                <p className="text-sm text-gray-600">Chrome • Windows • Dhaka, BD</p>
                <p className="mt-1 text-xs text-gray-500">Last active: Just now</p>
              </div>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Active
            </span>
          </div>

          {/* Other Sessions */}
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">Mobile Device</p>
                <p className="text-sm text-gray-600">Safari • iPhone • Dhaka, BD</p>
                <p className="mt-1 text-xs text-gray-500">Last active: 2 hours ago</p>
              </div>
            </div>
            <button className="text-sm font-medium text-red-600 hover:text-red-700">
              Revoke
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;