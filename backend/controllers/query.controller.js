const supabase = require("../config/db");

const input = async (req, res) => {
    try {
        const { search } = req.body;
        const user_id = req.client.id;
        if (!user_id) return res.status(401).json({ error: "Unauthorized: Missing user identity" });

        if (!search?.trim()) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const { data: existing, error: fetchError } = await supabase
            .from("recent_search")
            .select("query")
            .eq("user_id", user_id)
            .maybeSingle();

        if (fetchError) throw fetchError;

        let queryList = [];
        if (existing?.query) {
            try {
                queryList = typeof existing.query === "string"
                    ? JSON.parse(existing.query)
                    : Array.isArray(existing.query) ? existing.query : [existing.query];
            } catch {
                queryList = [existing.query];
            }
        }

        const normalizedSearch = search.trim();
        if (queryList.includes(normalizedSearch)) {
            return res.status(200).json({ message: "Already in history" });
        }

        const updatedHistory = [normalizedSearch, ...queryList].slice(0, 5);
        const dataToSave = JSON.stringify(updatedHistory);
        const query = supabase.from("recent_search");
        const { error: saveError } = existing
            ? await query.update({ query: dataToSave }).eq("user_id", user_id)
            : await query.insert([{ user_id, query: dataToSave }]);

        if (saveError) throw saveError;

        return res.status(200).json({
            message: "Search history updated",
            recent: updatedHistory
        });

    } catch (err) {
        console.error("Query Input Error:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


const get = async (req, res) => {
    try {
        const user_id = req.client.id;
        if (!user_id) return res.status(401).json({ error: "Unauthorized: Missing user identity" });

        const { data, error } = await supabase
            .from("recent_search")
            .select("query")
            .eq("user_id", user_id)
            .maybeSingle();

        if (error) throw error;

        let recent = [];
        if (data?.query) {
            try {
                recent = typeof data.query === "string" ? JSON.parse(data.query) : data.query;
            } catch {
                recent = [data.query];
            }
        }

        return res.status(200).json({ data: recent });

    } catch (err) {
        console.error("Query Get Error:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const remove = async (req, res) => {
    try {
        const { search } = req.body;
        const user_id = req.client.id;
        if (!user_id) return res.status(401).json({ error: "Unauthorized: Missing user identity" });

        const { data: existing, error: fetchError } = await supabase
            .from("recent_search")
            .select("query")
            .eq("user_id", user_id)
            .maybeSingle();

        if (fetchError) throw fetchError;

        if (!existing) return res.status(404).json({ error: "Not Found: No recent queries found" });

        let queryList = [];
        try {
            queryList = typeof existing.query === "string"
                ? JSON.parse(existing.query)
                : Array.isArray(existing.query)
                    ? existing.query
                    : [existing.query];
        } catch {
            queryList = [existing.query];
        }

        const normalizedSearch = search.trim();
        const updatedHistory = queryList.filter((item) => item !== normalizedSearch);
        const { error: saveError } = await supabase
            .from("recent_search")
            .update({ query: JSON.stringify(updatedHistory) })
            .eq("user_id", user_id);

        if (saveError) throw saveError;

        return res.status(200).json({
            message: "Search history updated",
            recent: updatedHistory
        });

    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const clear = async (req, res) => {
    try {
        const user_id = req.client.id;
        if (!user_id) return res.status(401).json({ error: "Unauthorized: Missing user identity" });

        console.log(user_id)

        const { error } = await supabase
            .from("recent_search")
            .delete()
            .eq("user_id", user_id);

        if (error) throw error;

        return res.status(200).json({ message: "Search history cleared" });
    } catch (err) {
        console.error("Query Clear Error:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { input, get, remove, clear };
