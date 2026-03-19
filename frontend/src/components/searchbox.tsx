export default function Searchbox({ query, setQuery, handleProductEnteredSearch }: any) {
    const Enter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleProductEnteredSearch(query);
        }
    }
    return (
        <>
            <input
                placeholder="Search"
                value={query}
                autoFocus
                className="bg-transparent px-3 outline-none"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={Enter}
            />
        </>
    );
}