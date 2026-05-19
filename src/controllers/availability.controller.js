import {
  getMonthAvailability,
  getDayAvailability,
  validateSlot,
} from '../services/bookingEngine.js';

export async function getGroundMonthAvailability(req, res, next) {
  try {
    const { year, month } = req.query;
    const y = Number(year) || new Date().getFullYear();
    const m = Number(month) || new Date().getMonth() + 1;
    const data = await getMonthAvailability(req.params.id, y, m);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function getGroundDayAvailability(req, res, next) {
  try {
    const data = await getDayAvailability(req.params.id, req.params.date);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function validateBookingSlot(req, res, next) {
  try {
    const userId = req.user?._id || null;
    const data = await validateSlot(req.body.groundId, req.body, userId);
    res.json({
      success: true,
      data: {
        available: true,
        startTime: data.startTime,
        endTime: data.endTime,
        totalPrice: data.totalPrice,
        schedule: data.schedule,
        slotType: data.slotType,
      },
    });
  } catch (err) {
    next(err);
  }
}
