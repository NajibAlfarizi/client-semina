import React, { useState } from "react";
import { Figure, Form } from "react-bootstrap";
import Button from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import { config } from "../../configs";

export default function SpeakersForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) {
  const [imagePreview, setImagePreview] = useState("");

  const handleFileChange = (e) => {
    handleChange(e);

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  return (
    <Form>
      <TextInputWithLabel
        placeholder={"Masukan tipe"}
        label={"Type"}
        name="type"
        value={form.type}
        type="text"
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={"Masukan Avatar"}
        label={"Avatar"}
        name="avatar"
        type="file"
        onChange={handleFileChange}
      />
      {(imagePreview || form.avatar) && (
        <div>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src={imagePreview || `${config.api_image}/${form.avatar}`}
            />

            <Figure.Caption>Preview image avatar</Figure.Caption>
          </Figure>
        </div>
      )}
      <Button variant="primary" action={handleSubmit} loading={isLoading}>
        {edit ? "Ubah" : "Simpan"}
      </Button>
    </Form>
  );
}
