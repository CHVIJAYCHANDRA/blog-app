'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getSubscriptions } from '@/lib/api';
import SubsTableItem from '@/Components/AdminComponents/SubsTableItem'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchSubscriptions = async () => {
    try {
      const data = await getSubscriptions();
      setSubscriptions(data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Subscriptions</h1>
      <div className="grid gap-6">
        {subscriptions.map((subscription) => (
          <div key={subscription.id} className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{subscription.email}</h2>
            <p className="text-gray-600">
              Subscribed on: {new Date(subscription.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
