import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const BadgeForm = ({ badge, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    levelRequired: 0,
  });

  useEffect(() => {
    if (badge) {
      setFormData({ name: badge.name, levelRequired: badge.levelRequired });
    }
  }, [badge]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
      <Form.Group controlId="formBadgeName">
        <Form.Label>Badge Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter badge name"
        />
      </Form.Group>

      <Form.Group controlId="formLevelRequired">
        <Form.Label>Level Required</Form.Label>
        <Form.Control
          type="number"
          name="levelRequired"
          value={formData.levelRequired}
          onChange={handleChange}
          placeholder="Enter level required"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {badge ? 'Update Badge' : 'Create Badge'}
      </Button>
    </Form>
  );
};

export default BadgeForm;
