'use client'

import { useState } from "react";

export default function useToast() {
    const [toast, setToast] = useState([]);
    const createToast = (type, title, message, duration = 5000) => {
        const id = Date.now();
        setToast((prev) => [...prev, { id, type, title, message }]);
        setTimeout(() => removeToast(id), duration);
    };

    const removeToast = (id) => {
        setToast((prev) => prev.filter((t) => t.id !== id));
    };

    return { toast, createToast, removeToast };
}