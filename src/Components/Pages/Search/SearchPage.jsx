import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaTint, FaMapMarkerAlt, FaEnvelope, FaUser } from 'react-icons/fa';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const selectClass =
  'w-full px-4 py-2.5 rounded-lg border border-red-100 bg-white text-gray-800 ' +
  'focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition cursor-pointer ' +
  'disabled:opacity-60 disabled:cursor-not-allowed';

const SearchPage = () => {
  const [districtsData, setDistrictsData] = useState({});
  const [districtsMap, setDistrictsMap] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [upazilas, setUpazilas] = useState([]);

  const [searchData, setSearchData] = useState({
    bloodGroup: '',
    district: '',
    upazila: '',
  });

  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

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
          setSearchData(prev => ({ ...prev, upazila: '' }));
        }
      });
  }, [selectedDistrict, districtsMap]);

  const handleChange = e => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));

    if (name === 'district') {
      setSelectedDistrict(value);
      setSearchData(prev => ({ ...prev, upazila: '' }));
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://blood-donation-vert.vercel.app/users');
      const allUsers = res.data;

      const matched = allUsers.filter(user => {
        const bloodMatch = searchData.bloodGroup ? user.bloodGroup === searchData.bloodGroup : true;
        const districtMatch = searchData.district
          ? user.district?.toLowerCase().trim() === searchData.district.toLowerCase().trim()
          : true;
        const upazilaMatch = searchData.upazila
          ? user.upazila?.toLowerCase().trim() === searchData.upazila.toLowerCase().trim()
          : true;

        return user.role === 'donor' && user.status === 'active' && bloodMatch && districtMatch && upazilaMatch;
      });

      setDonors(matched);
      setSearched(true);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 px-4 md:px-12 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                            tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-red-200">
            <FaSearch className="text-red-500" /> Find a Donor
          </span>
          <h2 className="text-3xl font-bold text-gray-900">Search Donors</h2>
          <p className="text-gray-500 mt-1 text-sm">Filter by blood group and location to find nearby donors.</p>
        </div>

        {/* Filter Card */}
        <div className="rounded-2xl border border-red-100 shadow-md bg-white p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              name="bloodGroup"
              value={searchData.bloodGroup}
              onChange={handleChange}
              className={selectClass}
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
              className={selectClass}
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
              className={selectClass}
              disabled={!selectedDistrict}
            >
              <option value="">Select Upazila</option>
              {upazilas.map(u => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700
                       disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3
                       rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <FaSearch className="text-sm" /> {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Results */}
        {searched && (
          donors.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {donors.map(donor => (
                <div
                  key={donor._id}
                  className="bg-white rounded-2xl border border-red-100 shadow-md p-6
                             hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100
                                     flex items-center justify-center text-red-600 text-lg shrink-0">
                      <FaUser />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">{donor.name}</h3>
                      <span className="inline-block bg-red-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full mt-0.5">
                        {donor.bloodGroup}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 border-t border-red-50 pt-3">
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-400 text-xs shrink-0" />
                      <span className="truncate">{donor.district}, {donor.upazila}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaEnvelope className="text-red-400 text-xs shrink-0" />
                      <span className="truncate">{donor.email}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-red-100">
              <FaTint className="text-red-200 text-4xl mx-auto mb-3" />
              <p className="text-gray-500">No donors found matching your criteria.</p>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default SearchPage;