'use client';

import { useState } from 'react';
import { Group, CreateGroupData, UpdateGroupData } from '../usecase/types';
import { useGroupStore } from '../presenter/group_store';

interface GroupManagerProps {
  onClose: () => void;
}

export default function GroupManager({ onClose }: GroupManagerProps) {
  const { groups, createGroup, updateGroup, deleteGroup, error } = useGroupStore();
  
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    color: '#3B82F6',
    order: 0
  });
  const [formError, setFormError] = useState('');

  const handleStartCreate = () => {
    setFormData({ name: '', color: '#3B82F6', order: groups.length });
    setEditingGroup(null);
    setIsCreating(true);
    setFormError('');
  };

  const handleStartEdit = (group: Group) => {
    setFormData({
      name: group.name,
      color: group.color,
      order: group.order
    });
    setEditingGroup(group);
    setIsCreating(false);
    setFormError('');
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setFormError('Group name is required');
      return;
    }

    try {
      if (editingGroup) {
        // Update existing group
        const updateData: UpdateGroupData = {
          name: formData.name,
          color: formData.color,
          order: formData.order
        };
        await updateGroup(editingGroup.id, updateData);
      } else {
        // Create new group
        const createData: CreateGroupData = {
          name: formData.name,
          color: formData.color,
          order: formData.order
        };
        await createGroup(createData);
      }
      
      setIsCreating(false);
      setEditingGroup(null);
      setFormData({ name: '', color: '#3B82F6', order: 0 });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to save group');
    }
  };

  const handleDelete = async (group: Group) => {
    if (!confirm(`Are you sure you want to delete the group "${group.name}"?`)) {
      return;
    }

    try {
      await deleteGroup(group.id);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete group');
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingGroup(null);
    setFormData({ name: '', color: '#3B82F6', order: 0 });
    setFormError('');
  };

  const showingForm = isCreating || editingGroup !== null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b-2 border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Manage Groups</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          {!showingForm && (
            <div className="mb-4">
              <button
                onClick={handleStartCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm"
              >
                Add New Group
              </button>
            </div>
          )}

          {/* Group Form */}
          {showingForm && (
            <div className="mb-6 border-2 border-blue-200 rounded-xl p-5 bg-white shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">
                {editingGroup ? 'Edit Group' : 'New Group'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter group name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-16 h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="#RRGGBB"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                  />
                </div>

                {formError && (
                  <div className="text-sm text-red-700 font-medium bg-red-50 border border-red-200 rounded-lg p-2">
                    {formError}
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Group List */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 mb-3">Existing Groups</h3>
            {groups.length === 0 ? (
              <p className="text-gray-500 italic">No groups available</p>
            ) : (
              groups
                .sort((a, b) => a.order - b.order)
                .map((group) => (
                  <div
                    key={group.id}
                    className="border-2 border-gray-200 rounded-xl p-4 flex items-center justify-between bg-white hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg border-2 border-gray-200"
                        style={{ backgroundColor: group.color }}
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{group.name}</div>
                        <div className="text-sm text-gray-600">
                          {group.color} • Order: {group.order}
                          {group.isDefault && <span className="ml-2 text-blue-600 font-medium">(Default)</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartEdit(group)}
                        className="px-3 py-1.5 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 hover:border-gray-400 text-sm font-semibold transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(group)}
                        className="px-3 py-1.5 bg-red-50 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 hover:border-red-400 text-sm font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
