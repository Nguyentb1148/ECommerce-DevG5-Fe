import { useCallback, useMemo } from 'react';

export default function useVariantPermutation(arrVariant) {
    const permute = useCallback(
        (arr = [], callback, prefix = []) => {
            if (!arr.length || !arr[0]?.length) return callback(prefix);

            for (let i = 0; i < arr[0]?.length; i++) {
                permute(arr.slice(1), callback, [...prefix, arr[0][i]]);
            }
        },
        []
    );

    return useMemo(() => {
        const permutations = [];

        if (arrVariant.length > 0) {
            permute(arrVariant, (variants) => {
                permutations.push(variants);
            });
        }

        return permutations;
    }, [arrVariant, permute]);
}
