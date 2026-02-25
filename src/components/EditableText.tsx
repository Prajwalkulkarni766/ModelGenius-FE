import React, { useState } from 'react';
import { Typography, TextField, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => Promise<void>;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
  label?: string;
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  variant = 'body1',
  label,
  multiline = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [saving, setSaving] = useState(false);

  const handleStartEdit = () => {
    setEditValue(value);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (editValue === value) {
      setIsEditing(false);
      return;
    }
    setSaving(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
      setEditValue(value);
    } finally {
      setSaving(false);
    }
  };

  if (isEditing) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {label && (
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <TextField
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            variant="outlined"
            size="small"
            multiline={multiline}
            fullWidth
            disabled={saving}
          />
          <IconButton onClick={handleSave} disabled={saving} color="primary" size="small">
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleCancel} disabled={saving} color="default" size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant={variant} sx={{ flexGrow: 1 }}>
        {label && `${label}: `}
        {value}
      </Typography>
      <IconButton onClick={handleStartEdit} size="small">
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default EditableText;
