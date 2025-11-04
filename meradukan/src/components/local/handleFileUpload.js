  const handleFileUpload = async (file, field) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      field === "banner" ? setLoadingBanner(true) : setLoadingLogo(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        form.setFieldsValue({ [field]: res.data.fileUrl });
        message.success(`${field} uploaded successfully!`);
      } else {
        message.error(`Failed to upload ${field}`);
      }
    } catch (error) {
      message.error(`Error uploading ${field}`);
    } finally {
      field === "banner" ? setLoadingBanner(false) : setLoadingLogo(false);
    }
  };