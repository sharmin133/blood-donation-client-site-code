import React, { useEffect, useState } from 'react';
import axios from 'axios';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const SearchPage = () => {
  const [districtsData, setDistrictsData] = useState({}); // { districtName: [] }
  const [districtsMap, setDistrictsMap] = useState({});   // { districtName: districtId }
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [upazilas, setUpazilas] = useState([]); // array of upazila names for selected district

  const [searchData, setSearchData] = useState({
    bloodGroup: '',
    district: '',
    upazila: '',
  });

  const [donors, setDonors] = useState([]);

  // Load district data, extract map and empty upazila arrays
  useEffect(() => {
    fetch('/districtData.json')
      .then(res => res.json())
      .then(jsonData => {
        const tableEntry = jsonData.find(entry => entry.type === 'table' && entry.name === 'districts');
        if (tableEntry && Array.isArray(tableEntry.data)) {
          const districtsObj = {};
          const districtsMapObj = {};
          tableEntry.data.forEach(district => {
            districtsObj[district.name] = [];
            districtsMapObj[district.name] = district.id;
          });
          setDistrictsData(districtsObj);
          setDistrictsMap(districtsMapObj);
        }
      });
  }, []);

  // Load and filter upazilas when district changes
  useEffect(() => {
    if (!selectedDistrict) {
      setUpazilas([]);
      setSearchData(prev => ({ ...prev, upazila: '' }));
      return;
    }

    const districtId = districtsMap[selectedDistrict];

    fetch('/upazilaData.json')
      .then(res => res.json())
      .then(jsonData => {
        const tableEntry = jsonData.find(entry => entry.type === 'table' && entry.name === 'upazilas');
        if (tableEntry && Array.isArray(tableEntry.data)) {
          const filteredUpazilas = tableEntry.data
            .filter(u => String(u.district_id) === String(districtId))
            .map(u => u.name);
          setUpazilas(filteredUpazilas);
          setSearchData(prev => ({ ...prev, upazila: '' })); // reset selected upazila
        }
      });
  }, [selectedDistrict, districtsMap]);

const handleChange = e => {
  const { name, value } = e.target;
  setSearchData(prev => ({ ...prev, [name]: value }));
  console.log('searchData updated:', { ...searchData, [name]: value });

  if (name === 'district') {
    setSelectedDistrict(value);
    setSearchData(prev => ({ ...prev, upazila: '' }));
  }
};

 const handleSearch = async () => {
  try {
    const res = await axios.get('https://blood-donation-vert.vercel.app/users');
    const allUsers = res.data;

    console.log('All users fetched:', allUsers);

    const matched = allUsers.filter(user => {
      const bloodMatch = searchData.bloodGroup ? user.bloodGroup === searchData.bloodGroup : true;
      const districtMatch = searchData.district
        ? user.district?.toLowerCase().trim() === searchData.district.toLowerCase().trim()
        : true;
      const upazilaMatch = searchData.upazila
        ? user.upazila?.toLowerCase().trim() === searchData.upazila.toLowerCase().trim()
        : true;

      console.log(`Checking user: ${user.name}, bloodMatch: ${bloodMatch}, districtMatch: ${districtMatch}, upazilaMatch: ${upazilaMatch}`);

      return user.role === 'donor' && user.status === 'active' && bloodMatch && districtMatch && upazilaMatch;
    });

    setDonors(matched);
  } catch (error) {
    console.error('Search failed', error);
  }
};
  return (
    <main className="min-h-screen max-w-5xl mx-auto p-6 pt-20">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Search Donors 🔍</h2>

      <div className="grid grid-cols-1  gap-4 mb-6">
        <select
          name="bloodGroup"
          value={searchData.bloodGroup}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map(group => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        <select
          name="district"
          value={searchData.district}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select District</option>
          {Object.keys(districtsData).map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          name="upazila"
          value={searchData.upazila}
          onChange={handleChange}
          className="select select-bordered w-full"
          disabled={!selectedDistrict}
        >
          <option value="">Select Upazila</option>
          {upazilas.map(u => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="btn bg-red-600 hover:bg-red-700 text-white w-full"
        >
          Search
        </button>
      </div>

      {donors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {donors.map(donor => (
            <div
              key={donor._id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg text-red-600">{donor.name}</h3>
              <p>
                <strong>Blood Group:</strong> {donor.bloodGroup}
              </p>
              <p>
                <strong>District:</strong> {donor.district}
              </p>
              <p>
                <strong>Upazila:</strong> {donor.upazila}
              </p>
              <p>
                <strong>Email:</strong> {donor.email}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">No donors found</p>
      )}
    </main>
  );
};

export default SearchPage;
