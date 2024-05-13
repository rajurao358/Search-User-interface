import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

interface Item {
  id: number;
  name: string;
  description: string;
  price: string;  
  image: string;
}

const fetchItems = async (search: string, offset: number, limit: number): Promise<Item[]> => {
  const { data } = await axios.get<Item[]>(`http://localhost:4000/api/items?search=${search}&offset=${offset}&limit=${limit}`);
  return data;
};

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true); // Better naming for understanding

  useEffect(() => {
    // Function to load items
    const loadItems = async () => {
      setLoading(true); // Set loading before API call
      const fetchedItems = await fetchItems(search, 0, 10); // Always start at offset 0
      setItems(fetchedItems); // Reset the items array with new results
      setOffset(fetchedItems.length);
      setHasMore(fetchedItems.length === 10); // Check if there might be more items to load
      setLoading(false);
    };

    if (isFirstRender.current) {
      isFirstRender.current = false; // Skip the first execution
    } else {
      loadItems(); // Execute when search changes
    }
  }, [search]);

  const loadMoreItems = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const fetchedItems = await fetchItems(search, offset, 10);
    setItems(prevItems => [...prevItems, ...fetchedItems]);
    setOffset(prevOffset => prevOffset + fetchedItems.length);
    setHasMore(fetchedItems.length === 10);
    setLoading(false);
  };

  return (
    <div className="templateContainer">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search here..."
        className="searchInput_Container"
      />
      <div className="template_Container">
        <InfiniteScroll
          dataLength={items.length}
          next={loadMoreItems}
          hasMore={hasMore && !loading}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          endMessage={<p style={{ textAlign: 'center' }}>
            <b>You have seen all items</b>
          </p>}
        >
          {items.map(item => (
            <div className="template" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '10px' }}>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <strong style={{ margin: 0 }}>{item.price}</strong>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
