import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('notification-list', 'Unit | Component | notification list', {
  needs: []
});

test('it exists', function (assert) {
  assert.expect(1);

  const component = this.subject();

  assert.ok(!!component);
});

test('notifications are ordered by date', function (assert) {
  assert.expect(3);

  const notifications = [
    { created: new Date(2016, 5, 1) },
    { created: new Date(2016, 5, 2) },
    { created: new Date(2016, 5, 3) },
  ];

  const component = this.subject({ notifications });
  const orderedNotifications = component.get('orderedNotifications');

  assert.equal(orderedNotifications[0], notifications[2]);
  assert.equal(orderedNotifications[1], notifications[1]);
  assert.equal(orderedNotifications[2], notifications[0]);
});

test('notifications are ordered by importance', function (assert) {
  assert.expect(1);

  const notifications = [
    { important: false, created: new Date(2016, 5, 1) },
    { important: false, created: new Date(2016, 5, 2) },
    { important: true, created: new Date(2016, 5, 3) },
    { important: false, created: new Date(2016, 5, 4) },
  ];

  const component = this.subject({ notifications });
  const orderedNotifications = component.get('orderedNotifications');

  assert.equal(orderedNotifications[0], notifications[2]);
});

test('only the `numNotifications` first notifications are listed', function (assert) {
  assert.expect(3);

  const notifications = [
    { created: new Date(2016, 5, 1) },
    { created: new Date(2016, 5, 2), important: true },
    { created: new Date(2016, 5, 3) },
    { created: new Date(2016, 5, 4) },
  ];

  const component = this.subject({ notifications, numNotifications: 2 });
  const topNotifications = component.get('topNotifications');

  assert.equal(topNotifications.length, 2);
  assert.equal(topNotifications[0], notifications[1]);
  assert.equal(topNotifications[1], notifications[3]);
});

test('only important notifications are important', function (assert) {
  assert.expect(2);

  const notifications = [
    { important: false },
    { important: true },
    { important: false },
  ];

  const component = this.subject({ notifications });
  const newNotifications = component.get('importantNotifications');

  assert.equal(newNotifications.length, 1);
  assert.equal(newNotifications[0], notifications[1]);
});

test('only unseen notifications are new', function (assert) {
  assert.expect(2);

  const notifications = [{ seen: true }, { seen: false }, { seen: true }];

  const component = this.subject({ notifications });
  const newNotifications = component.get('newNotifications');

  assert.equal(newNotifications.length, 1);
  assert.equal(newNotifications[0], notifications[1]);
});
