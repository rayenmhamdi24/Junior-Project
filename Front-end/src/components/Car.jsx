import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Car = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [newCar, setNewCar] = useState({
    name: '',
    price: '',
    quantity: '',
    image: '',
    description: ''
  });
  const [editCar, setEditCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    const filtered = cars.filter(car =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCars(filtered);
  }, [searchTerm, cars]);

  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/cars/getAll');
      setCars(response.data);
      setFilteredCars(response.data);
    } catch (error) {
      setError('Failed to fetch cars. Please try again.');
      console.error('Error fetching cars:', error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'price' || name === 'quantity' ? value : value;
    if (editCar) {
      setEditCar({ ...editCar, [name]: updatedValue });
    } else {
      setNewCar({ ...newCar, [name]: updatedValue });
    }
  };

  const addToCart = (car) => {
    const existingItem = cartItems.find(item => item.id === car.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === car.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...car, quantity: 1 }]);
    }
    
    alert(`${car.name} added to cart`);
  };

  const addCar = async () => {
    if (!newCar.name || newCar.price <= 0 || newCar.quantity < 0) {
      setError('Please fill in all required fields with valid values.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3000/cars/add', {
        ...newCar,
        price: Number(newCar.price),
        quantity: Number(newCar.quantity)
      });
      setCars([...cars, response.data]);
      setNewCar({ name: '', price: '', quantity: '', image: '', description: '' });
    } catch (error) {
      setError('Failed to add car. Please try again.');
      console.error('Error adding car:', error);
    }
    setLoading(false);
  };

  const updateCar = async () => {
    if (!editCar || !editCar.name || editCar.price <= 0 || editCar.quantity < 0) {
      setError('Please fill in all required fields with valid values.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`http://localhost:3000/cars/update/${editCar.id}`, {
        ...editCar,
        price: Number(editCar.price),
        quantity: Number(editCar.quantity)
      });
      setCars(cars.map(car => (car.id === editCar.id ? response.data : car)));
      setEditCar(null);
    } catch (error) {
      setError('Failed to update car. Please try again.');
      console.error('Error updating car:', error);
    }
    setLoading(false);
  };

  const deleteCar = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:3000/cars/delete/${id}`);
      setCars(cars.filter(car => car.id !== id));
      if (editCar && editCar.id === id) setEditCar(null);
    } catch (error) {
      setError('Failed to delete car. Please try again.');
      console.error('Error deleting car:', error);
    }
    setLoading(false);
  };

  const startEditing = (car) => {
    setEditCar({
      ...car,
      price: String(car.price),
      quantity: String(car.quantity)
    });
    setError(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Car Management</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center text-gray-600">Loading...</div>
      )}

      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search cars by name..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Car List</h2>
        {filteredCars.length === 0 && !loading && (
          <p className="text-gray-500">No cars found.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map(car => (
            <div key={car.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {car.image && (
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{car.name}</h3>
                <p className="text-gray-600 mb-2">${car.price}</p>
                <p className="text-sm text-gray-500 mb-2">{car.quantity} in stock</p>
                <p className="text-sm text-gray-600 mb-4">{car.description}</p>
                <div className="flex justify-between items-center">
                  <div className="space-x-2">
                    <button
                      onClick={() => startEditing(car)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCar(car.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                  <button
                    onClick={() => addToCart(car)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editCar ? 'Edit Car' : 'Add New Car'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={editCar ? editCar.name : newCar.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={editCar ? editCar.price : newCar.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              step="any"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={editCar ? editCar.quantity : newCar.quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              step="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={editCar ? editCar.image : newCar.image}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={editCar ? editCar.description : newCar.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          {editCar ? (
            <>
              <button
                onClick={updateCar}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Update Car
              </button>
              <button
                onClick={() => setEditCar(null)}
                disabled={loading}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addCar}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              Add Car
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Car;