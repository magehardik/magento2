/************************************************************************
 *
 * Copyright 2024 Adobe
 * All Rights Reserved.
 *
 * ************************************************************************
 */
define(['mage/adminhtml/grid'], function () {
    'use strict';
    describe('mage/adminhtml/grid', function () {
        let gridInstance;

        beforeEach(function () {
            // Create an instance of varienGrid
            // eslint-disable-next-line no-undef
            gridInstance = new varienGrid();

            spyOn(gridInstance, 'reload');
            // eslint-disable-next-line max-nested-callbacks
            spyOn(gridInstance, 'addVarToUrl').and.callFake(function (filterVar, value) {
                return `https://test.com/${filterVar}/${value}/`;
            });
            gridInstance.filterVar = 'filter';
        });

        it('should reset the filter, clean the URL, and reload with the correct URL', function () {
            let callback = jasmine.createSpy('callback'),
                expectedUrl = 'https://test.com/filter/';

            gridInstance.resetFilter(callback);
            expect(gridInstance.addVarToUrl).toHaveBeenCalledWith('filter', '');
            expect(gridInstance.reload).toHaveBeenCalledWith(expectedUrl, callback);
            expect(gridInstance.reload.calls.count()).toBe(1);
        });
    });
});
