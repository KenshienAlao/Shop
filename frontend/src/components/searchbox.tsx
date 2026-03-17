export default function Searchbox({ query, setQuery }: any) {
    return (
        <>
            <input
                placeholder="Search"
                value={query}
                autoFocus
                className="bg-transparent px-3 outline-none"
                onChange={(e) => setQuery(e.target.value)}
            />
        </>
    );
}