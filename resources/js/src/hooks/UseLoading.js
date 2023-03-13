import { useCallback, useState } from "react";

export function useLoading() {
    const [isLoading, setIsLoading] = useState(false);
    const load = useCallback(
        (promise) => {
            if (isLoading) return Promise.reject("Already loading");
            setIsLoading(true);

            return promise.finally(() => {
                setIsLoading(false);
            });
        },
        [isLoading]
    );

    return [isLoading, load];
}
