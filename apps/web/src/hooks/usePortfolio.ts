import { useState, useEffect } from 'react';
import axios from 'axios';

export interface PortfolioItem {
    id: string;
    name: string;
    ticker: string;
    quantity: number;
    averagePrice: number;
    currentPrice: number;
    currency: string;
    investedValue: number;
    currentValue: number;
    profit: number;
    returnRate: number;
}

export const usePortfolio = () => {
    const [data, setData] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Assuming backend is running on localhost:3001
            const response = await axios.get('http://localhost:3001/api/portfolio');
            setData(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch portfolio data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, refetch: fetchData };
};
