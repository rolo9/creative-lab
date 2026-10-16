# 星から向きを知る

Human interest: space exploration / spacecraft, not a generic algorithm with a space skin. Artifact: determine camera attitude from star pixels and a fixed star direction catalog. One takeaway: identify several stars by their angular arrangement, then recover a 3D rotation. Not position estimation, orbital determination or physical spacecraft construction.

## Boundary and motivation
This version uses a deterministic synthetic all-sky catalog of300 directions (seed4317), not a real star catalog. A pinhole camera with known50-degree field of view projects the star directions; 256x256 raster quantization creates the input. The simulator knows the attitude. The solver receives ONLY pixels, catalog, resolution and field of view. No ground-truth attitude, scene seed, projected coordinates or input star IDs enter solve(). Ground truth is used only after solving to evaluate the rotation error. Catalog IDs label correspondence after matching, not at sensor input.

Real inspiration: ESA Star Trackers First Contact https://kelvins.esa.int/star-trackers-first-contact/challenge/ explains star identification in camera scenes; ESA ground simulation https://www.esa.int/ESA_Multimedia/Images/2017/12/Simulating_stars_in_the_cleanroom describes synthetic star fields used in testing. This demo is a simplified educational implementation, not an implementation or validation of ESA flight software.

## Implementation
- Threshold connected bright pixels, intensity centroid, convert pixel positions to unit camera rays.
- Largest-separation observed pair supplies anchors; search catalog ordered pairs with dot-product agreement within.003.
- Construct two orthonormal bases and recover world-from-camera rotation. Score one-to-one catalog matches for all observed points within.24 degrees. Select maximum match count then smallest summed angular residual.
- At least4 matches and80% of detections required. These are implementation heuristics, not universal physical minimums or calibrated reliability.
- Two oriented rays determine a rotation when their correspondences are known, but unknown identities require corroboration. One ray leaves rotation about itself unconstrained. Therefore1-star input deliberately refuses.
- Missing stars remove a deterministic prefix subset of projected stars, not a physically modeled occluder. Whole/half/one controls compare exact same attitude. New scene changes orientation. Map uses equirectangular projection and shows synthetic longitude/latitude, not equatorial RA/Dec or Earth geography. Roll is also estimated.

No ML/DL. This version provides a purposeful reason to learn geometry, image detection, matching and estimation. Future questions may involve robustness to false points, noise, lens calibration or learned detection. Do not claim ML superiority or add an algorithm solely to include ML. Do not present this as the whole ML learning curriculum.

No noise, false detections, motion blur, lens distortion, brightness catalog matching, optimization over all correspondences, rigorous ambiguity detection, uncertainty calibration or real-sky testing. A matched scene in this ideal setting is not evidence of mission readiness. When matches insufficient, decline rather than show attitude. Greedy matching and anchor choice can fail; success is not guaranteed for arbitrary scenes.

## Verification
`node tests/star-tracker.test.cjs`: predeclared seeds1,2,3,4,5,61,701,9001; all/half stars; attitude rotation error<.5degrees for16 cases; one-star and blank refusal; angle roundtrip. Error observed .027–.205degrees. Not a statistical real-sky performance claim; report saved in verification.json. Camera rendering+substituteDOM tests actual raster processing, full/half/one changes, busy buttons, scene change and result clearing. Browser CSS, physical touch and rendered-page QA unavailable/unverified. No preview server or browser installed.

## Learning continuity
The previous ball/floor experiment remains closed as unsuccessful; do not redefine this as its success. Digits were familiar from Human's course. Human described difficulty connecting understood algorithms (e.g.k-means) to uses/decisions, then expressed interest in space. AI proposed star-based attitude determination as a purposeful artifact; Human authorized trying it. Do not turn this into a prerequisite quiz or infer understanding from delivery. After experience, explain only what is needed for the observed question; later changes should answer a concrete limitation in the same purpose.
