var twoSum = function (nums, target) {
    const mapOfNumbers = new Map();

    for (var i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (mapOfNumbers.has(complement)) {
            return [mapOfNumbers.get(complement), nums[i]];
        }

        mapOfNumbers.set(nums[i], nums[i]);
    }
};

console.log(twoSum([2, 7, 11, 15], 9));