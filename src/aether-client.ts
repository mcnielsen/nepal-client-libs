/**
 * Module to deal with available Ticket Master Public API endpoints
 */
import { AlApiClient, ALClient } from '@al/client';

export interface AetherResult {
    id?: string;
    fields?: {
        impact?: string;
        engine?: string;
        cvss_vector?: string;
        description?: string;
        cpe_names?: string[];
        origin_id?: string;
        pci_exception_reason?: string;
        resolution?: string;
        name?: string;
        pci_severity?: string;
        last_modified?: string;
        supported_platforms?: string[];
        cvss_score?: string;
        cve?: string;
        cwe?: string;
        reference?: string;
        severity?: string;
    };
}

export interface AetherSearchResponse {
    status?: {
        rid?: string;
        'time-ms'?: number;
    };
    hits?: {
        found?: number;
        start?: number;
        hit?: AetherResult[];
    };
}

export class AetherClientInstance {
    private serviceName = 'aether';

    public constructor(public client: AlApiClient = ALClient) {
    }

    /**
     * Exposures Search
     * POST
     * /aether/exposures/2013-01-01/search
     * "https://api.cloudinsight.alertlogic.com/aether/exposures/2013-01-01/search"
     *
     * Please note that this is a provisional method and subject to imminent change.
     *
     * @param query The search string, or null.
     * @param advanced Optional, configuration parameters for sorting, paging & other things
     */
    public async search(query: string,
        advanced?: {
            parser?: string,
            options?: string,
            size?: number,
            sort?: string,
            start?: number,
            format?: string,
            cursor?: string,
            fp?:string,
            facet?:string
        }) {
        let queryParams = '';
        if (advanced && advanced.parser) {
            queryParams = queryParams.concat('&q.parser=', advanced.parser);
        }
        if (advanced && advanced.options) {
            queryParams = queryParams.concat('&options=', advanced.options);
        }
        if (advanced && advanced.size) {
            queryParams = queryParams.concat('&size=', advanced.size.toString());
        }
        if (advanced && advanced.sort) {
            queryParams = queryParams.concat('&sort=', advanced.sort);
        }
        if (advanced && advanced.start) {
            queryParams = queryParams.concat('&start=', advanced.start.toString());
        }
        if (advanced && advanced.format) {
            queryParams = queryParams.concat('&format=', advanced.format);
        }
        if (advanced && advanced.cursor) {
            queryParams = queryParams.concat('&cursor=', advanced.cursor);
        }

        if (advanced && advanced.fp) {
            queryParams = queryParams.concat('&fp=', advanced.fp);
        }
        if (advanced && advanced.facet) {
            queryParams = queryParams.concat('&', advanced.facet);
        }
        const results = await this.client.post({
            service_name: this.serviceName,
            path: '/exposures/2013-01-01/search',
            version: null,
            data: `q=${query}${queryParams}`
        });
        return results as AetherSearchResponse;
    }
}
