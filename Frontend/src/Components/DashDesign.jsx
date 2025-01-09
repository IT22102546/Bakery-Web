import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Button, Table } from 'flowbite-react';

export default function DashDesign() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState({});
  const [activeButton, setActiveButton] = useState(null); // Track which button is active (Confirm or Reject)
  const { currentUser } = useSelector((state) => state.user);

  // Fetch designs and corresponding user details
  const fetchDesigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/designs/getDesignsByShopId/${currentUser._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw ('No Available designs.');
      }

      const data = await response.json();
      setDesigns(data.designs);
      
      // Fetch user details for each design
      const userIds = data.designs.map((design) => design.userId);
      const uniqueUserIds = [...new Set(userIds)];

      const userPromises = uniqueUserIds.map((id) =>
        fetch(`/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then((res) => res.json())
      );

      const userResponses = await Promise.all(userPromises);
      const userMap = userResponses.reduce((acc, user) => {
        acc[user._id] = user.username;
        return acc;
      }, {});
      
      setUsers(userMap);

    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchDesigns();
    }
  }, [currentUser]);

  // Handle Accept/Reject action
  const handleActionClick = async (designId, action) => {
    const response = await fetch(`/api/designs/updateStatus/${designId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        action, // 'confirm' or 'reject'
      }),
    });

    if (response.ok) {
      fetchDesigns(); // Reload the designs after updating status
      setActiveButton(null); // Reset button state
    } else {
      setError('Error updating status.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Design Requests</h1>
      {designs.length === 0 ? (
        <p className="text-center text-gray-600">No design requests available.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Cake Type</Table.HeadCell>
              <Table.HeadCell>Cake Shape</Table.HeadCell>
              <Table.HeadCell>Cake Size</Table.HeadCell>
              <Table.HeadCell>Vegan Option</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {designs.map((design) => (
                <Table.Row key={design._id} className="hover:bg-gray-100">
                  <Table.Cell>{users[design.userId]}</Table.Cell>
                  <Table.Cell>{design.cakeType}</Table.Cell>
                  <Table.Cell>{design.cakeShape}</Table.Cell>
                  <Table.Cell>{design.cakeSize}</Table.Cell>
                  <Table.Cell>{design.veganOption}</Table.Cell>
                  <Table.Cell>
                    {design.isAccept ? (
                      <p className="text-green-600">Confirmed</p>
                    ) : design.isReject ? (
                      <p className="text-red-600">Rejected</p>
                    ) : (
                      <p className="text-yellow-600">Pending</p>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {/* Accept/Reject buttons */}
                    {!design.isAccept && !design.isReject && (
                      <>
                        <Button
                          onClick={() => {
                            handleActionClick(design._id, 'confirm');
                            setActiveButton('confirm');
                          }}
                          color="primary"
                          disabled={activeButton === 'confirm'}
                        >
                          Confirm
                        </Button>
                        <Button
                          onClick={() => {
                            handleActionClick(design._id, 'reject');
                            setActiveButton('reject');
                          }}
                          color="failure"
                          className="ml-2"
                          disabled={activeButton === 'reject'}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
}
