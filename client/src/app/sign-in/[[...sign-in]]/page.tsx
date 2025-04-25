import { useUser } from '@clerk/nextjs';

export default function Page() {
    const { isSignedIn, user } = useUser();

    if (!isSignedIn) {
        return <div>Please sign in to continue.</div>;
    }

    console.log('User Info:', user);

    return (
        <div className='relative min-h-screen flex items-center justify-center'>
            <p>Welcome, {user?.fullName || 'User'}!</p>
        </div>
    );
}