import { Alert, Button, FileInput, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdateSweet() {
  const [files, setFiles] = useState([null, null, null, null]);
  const [imageUploadProgress, setImageUploadProgress] = useState([null, null, null, null]);
  const [imageUploadError, setImageUploadError] = useState([null, null, null, null]);
  const [formData, setFormData] = useState({ images: [] });
  const [publishError, setPublishError] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/sweets/getsweets?productId=${productId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        const product = data.products.find(p => p._id === productId);
        setFormData({ ...product, description: product.description || '' });
        setPublishError(null);
      } catch (error) {
        setPublishError(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleFileChange = (index, file) => {
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
  };

  const handleUploadImage = (index) => {
    const file = files[index];
    if (!file) {
      const newErrors = [...imageUploadError];
      newErrors[index] = 'Please select an image';
      setImageUploadError(newErrors);
      return;
    }
    const newErrors = [...imageUploadError];
    newErrors[index] = null;
    setImageUploadError(newErrors);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const newProgress = [...imageUploadProgress];
        newProgress[index] = progress.toFixed(0);
        setImageUploadProgress(newProgress);
      },
      (error) => {
        const newErrors = [...imageUploadError];
        newErrors[index] = 'Image upload failed';
        setImageUploadError(newErrors);
        const newProgress = [...imageUploadProgress];
        newProgress[index] = null;
        setImageUploadProgress(newProgress);
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newProgress = [...imageUploadProgress];
          newProgress[index] = null;
          setImageUploadProgress(newProgress);
          const newErrors = [...imageUploadError];
          newErrors[index] = null;
          setImageUploadError(newErrors);
          const newImages = [...formData.images];
          newImages[index] = downloadURL;
          setFormData({ ...formData, images: newImages });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/sweets/updatesweet/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate('/dashboard?tab=sweets');
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Products</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          } value={formData.title || ''} />
          <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })} value={formData.category || 'uncategorized'}>
          <option value='uncategorized'>Uncategorized</option>
            <option value='Vegan'>Vegan</option>
            <option value='Non-Vegan'>Non-Vegan</option>
            <option value='Gluten-Free'>Gluten-Free</option>
            <option value='Sugar-Free'>Sugar-Free</option>
            <option value='Halal'>Halal</option>
          </Select>
        </div>
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput type='file' accept='image/*' onChange={(e) => handleFileChange(index, e.target.files[0])} />
            <Button onClick={() => handleUploadImage(index)} type='button' size='sm' outline disabled={imageUploadProgress[index]}>
              {imageUploadProgress[index] ? (
                <div className="w-16 h-16">
                  <CircularProgressbar value={imageUploadProgress[index]} text={`${imageUploadProgress[index] || 0}`} />
                </div>
              ) : ('Upload Image')}
            </Button>
          </div>
        ))}
        {imageUploadError.map((error, index) => (
          error && <Alert key={index} color='failure'>{error}</Alert>
        ))}
        {formData.images.map((image, index) => (
          image && <img key={index} src={image} alt="upload" className="w-full h-82 object-cover" />
        ))}
        <Textarea
          placeholder="Description..."
          className="h-52 mb-12"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          value={formData.description || ''}
        />
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type="number" placeholder="Price" id="price" onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          } value={formData.price || ''} />
        
        </div>
        <Button type='submit' gradientDuoTone='purpleToBlue'>Update Sweets</Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}