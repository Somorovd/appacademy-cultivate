const express = require("express");
const { Venue, Group, User } = require("../../db/models");
const { requireAuth, buildAuthorzationErrorResponce } = require("../../utils/auth");
const { buildMissingResourceError } = require("../../utils/helpers");
const router = express.Router();

//#region 							PUT requests
router.put("/:venueId",
	requireAuth,
	async (req, res, next) => {
		const { address, city, state, lat, lng } = req.body;
		const venueId = req.params.venueId;
		const userId = req.user.id;

		const venue = await Venue.findByPk(venueId, {
			include: {
				model: Group.scope({ method: ["includeAuthorization", userId] })
			}
		});

		if (!venue)
			return buildMissingResourceError(next, "Venue");

		const group = venue["Group"];
		const isNotAuthorized = (
			group.organizerId != userId && !group["Members"][0]
		);
		if (isNotAuthorized)
			return buildAuthorzationErrorResponce(next);

		venue.set({ address, city, state, lat, lng });
		await venue.save();

		delete venue.dataValues["Group"];
		return res.json(venue);
	}
);
//#endregion

module.exports = router;
