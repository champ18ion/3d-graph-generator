import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to 3D Graph Generator</h1>
            <p>Create and customize 3D charts effortlessly!</p>
            <button
                style={{ padding: '10px 20px', marginTop: '20px' }}
                onClick={() => navigate('/editor')}
            >
                Start Creating
            </button>
        </div>
    );
};

export default Home;
