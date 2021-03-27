<template>
  <q-page v-if="metrics">
    <div class="q-pa-md">
      <h5 class="q-my-md">
        {{ $t('metrics.jvm.title') }}
      </h5>
      <h6 class="q-my-md">
        {{ $t('metrics.jvm.memory.title') }}
      </h6>
      <div class="row items-start q-gutter-md">
        <q-card
          v-bind:key="metric"
          v-for="(metric, key) in metrics['jvm']"
        >
          <q-card-section class="text-center">
            {{ key }}
          </q-card-section>
          <q-card-section class="text-center">
            <q-circular-progress
              show-value
              class="text-light-blue q-ma-md"
              :value="metric.max !== -1 ? percentMetric(metric) : 0"
              size="50px"
              color="light-blue"
            >
              {{ metric.max !== -1 ? `${Math.ceil(percentMetric(metric))}%` : '' }}
            </q-circular-progress>
          </q-card-section>
          <q-card-section>
            <div
              v-bind:key="detail"
              v-for="detail in Object.entries(metric)"
            >{{ detail[0] }} {{ humanStorageSize(detail[1]) }}</div>
          </q-card-section>
        </q-card>
      </div>
      <h6 class="q-my-md">
        {{ $t('metrics.jvm.gc.title') }}
      </h6>
      <div class="row items-start q-gutter-md">
        <q-card class="text-center">
          <q-card-section> GC Live Data Size / GC Max Data Size </q-card-section>
          <q-card-section>
            <q-circular-progress
              show-value
              class="text-light-blue q-ma-md"
              :value="percent(metrics.garbageCollector['jvm.gc.live.data.size'], metrics.garbageCollector['jvm.gc.max.data.size'])"
              size="50px"
              color="light-blue"
            >
              {{ Math.ceil(percent(metrics.garbageCollector['jvm.gc.live.data.size'], metrics.garbageCollector['jvm.gc.max.data.size'])) }}%
            </q-circular-progress>
          </q-card-section>
          <q-card-section>
            {{ humanStorageSize(metrics.garbageCollector['jvm.gc.live.data.size']) }} /
            {{ humanStorageSize(metrics.garbageCollector['jvm.gc.max.data.size']) }}
          </q-card-section>
        </q-card>
        <q-card class="text-center">
          <q-card-section> GC Memory Promoted / GC Memory Allocated </q-card-section>
          <q-card-section>
            <q-circular-progress
              show-value
              class="text-light-blue q-ma-md"
              :value="percent(metrics.garbageCollector['jvm.gc.memory.promoted'], metrics.garbageCollector['jvm.gc.memory.allocated'])"
              size="50px"
              color="light-blue"
            >
              {{
                Math.ceil(percent(metrics.garbageCollector['jvm.gc.memory.promoted'], metrics.garbageCollector['jvm.gc.memory.allocated']))
              }}%
            </q-circular-progress>
          </q-card-section>
          <q-card-section>
            {{ humanStorageSize(metrics.garbageCollector['jvm.gc.memory.promoted']) }} /
            {{ humanStorageSize(metrics.garbageCollector['jvm.gc.memory.allocated']) }}
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label>Classes loaded</q-item-label>
                  <q-item-label caption>{{ metrics.garbageCollector['classesLoaded'] }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Classes unloaded</q-item-label>
                  <q-item-label caption>{{ metrics.garbageCollector['classesUnloaded'] }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
        <q-markup-table>
          <thead>
            <tr>
              <th
                scope="row"
                colspan="8"
              >GC Pause</th>
            </tr>
            <tr>
              <th
                class="text-left"
                scope="col"
              >Count</th>
              <th
                class="text-left"
                scope="col"
              >Mean</th>
              <th
                class="text-left"
                scope="col"
              >Min</th>
              <th
                class="text-left"
                scope="col"
              >P50</th>
              <th
                class="text-left"
                scope="col"
              >P75</th>
              <th
                class="text-left"
                scope="col"
              >P95</th>
              <th
                class="text-left"
                scope="col"
              >P99</th>
              <th
                class="text-left"
                scope="col"
              >Max</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">{{ metrics.garbageCollector['jvm.gc.pause']['count'] }}</td>
              <td class="text-left">{{ metrics.garbageCollector['jvm.gc.pause']['mean'] }}</td>
              <td class="text-left">{{ metrics.garbageCollector['jvm.gc.pause']['0.0'] }}</td>
              <td class="text-left">{{ metrics.garbageCollector['jvm.gc.pause']['0.5'] }}</td>
              <td class="text-left">{{ metrics.garbageCollector['jvm.gc.pause']['0.75'] }}</td>
              <td class="text-left">{{ metrics.garbageCollector['jvm.gc.pause']['0.75'] }}</td>
              <td class="text-left">{{ metrics.garbageCollector['jvm.gc.pause']['0.99'] }}</td>
              <td class="text-left">{{ metrics.garbageCollector['jvm.gc.pause']['max'] }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>

      <div>
        <h6 class="q-my-md">System</h6>
        <div class="row items-start q-gutter-md">
          <q-card>
            <q-card-section>
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label>Uptime</q-item-label>
                    <q-item-label caption>{{ formatDistanceStrict(metrics['processMetrics']['process.uptime']) }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>Start Time</q-item-label>
                    <q-item-label caption>{{ format(metrics['processMetrics']['process.start.time']) }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>System CPU Count</q-item-label>
                    <q-item-label caption>{{ metrics['processMetrics']['system.cpu.count'] }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>System 1m Load Average</q-item-label>
                    <q-item-label caption>{{ metrics['processMetrics']['system.load.average.1m'] }} </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>Process File Max</q-item-label>
                    <q-item-label caption>{{ metrics['processMetrics']['process.files.max'] }} </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>Process File Open</q-item-label>
                    <q-item-label caption>{{ metrics['processMetrics']['process.files.open'] }} </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
          <q-card>
            <q-card-section> Process CPU Usage </q-card-section>
            <q-card-section>
              <q-circular-progress
                show-value
                class="text-light-blue q-ma-md"
                :value="metrics['processMetrics']['process.cpu.usage'] * 100"
                size="50px"
                color="light-blue"
              >
                {{ Math.ceil(metrics['processMetrics']['process.cpu.usage'] * 100) }}%
              </q-circular-progress>
            </q-card-section>
          </q-card>
          <q-card>
            <q-card-section> System CPU Usage </q-card-section>
            <q-card-section>
              <q-circular-progress
                show-value
                class="text-light-blue q-ma-md"
                :value="metrics['processMetrics']['system.cpu.usage'] * 100"
                size="50px"
                color="light-blue"
              >
                {{ Math.ceil(metrics['processMetrics']['system.cpu.usage'] * 100) }}%
              </q-circular-progress>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <h6 class="q-my-md">{{ $t('metrics.jvm.http.title') }}</h6>
      <div>
        {{ $t('metrics.jvm.http.total') }} {{ metrics['http.server.requests']['all']['count'] }}
        <div class="row items-start q-gutter-md">
          <q-markup-table>
            <thead>
              <tr>
                <th
                  class="text-left"
                  scope="col"
                >{{ $t('metrics.jvm.http.table.code') }}</th>
                <th
                  class="text-left"
                  scope="col"
                >{{ $t('metrics.jvm.http.table.count') }}</th>
                <th
                  class="text-left"
                  scope="col"
                >{{ $t('metrics.jvm.http.table.mean') }}</th>
                <th
                  class="text-left"
                  scope="col"
                >{{ $t('metrics.jvm.http.table.max') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-bind:key="key"
                v-for="(item, key) in metrics['http.server.requests']['percode']"
              >
                <td class="text-left">{{ key }}</td>
                <td class="text-left">{{ item.count }}</td>
                <td class="text-left">{{ item.mean }}</td>
                <td class="text-left">{{ item.max }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
      <h6 class="q-my-md">Endpoints requests (time in millisecond)</h6>
      <div>
        <div class="row items-start q-gutter-md">
          <q-markup-table>
            <thead>
              <tr>
                <th
                  class="text-left"
                  scope="col"
                >Endpoint URL</th>
                <th
                  class="text-left"
                  scope="col"
                >Method</th>
                <th
                  class="text-left"
                  scope="col"
                >Count</th>
                <th
                  class="text-left"
                  scope="col"
                >Mean</th>
              </tr>
            </thead>
            <tbody>
              <template
                v-bind:key="parentKey"
                v-for="(parentItem, parentKey) in metrics.services"
              >
                <tr
                  v-bind:key="method"
                  v-for="(i, method) in parentItem"
                >
                  <td class="text-left">{{ parentKey }}</td>
                  <td class="text-left">{{ method }}</td>
                  <td class="text-left">{{ i.count }}</td>
                  <td class="text-left">{{ i.mean }}</td>
                </tr>
              </template>
            </tbody>
          </q-markup-table>
        </div>
      </div>
      <h6 class="q-my-md">Database</h6>
      <div class="row items-start q-gutter-md">
        <q-card>
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label>Connection Pool Usage</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-bind:key="entry"
                v-for="entry in ['active', 'min', 'max', 'idle']"
              >
                <q-item-section>
                  <q-item-label>{{ capitalize(entry) }}</q-item-label>
                  <q-item-label caption>{{ metrics.databases[entry]['value'] }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
        <q-markup-table>
          <thead>
            <tr>
              <th scope="col"></th>
              <th
                class="text-left"
                scope="col"
              >Count</th>
              <th
                class="text-left"
                scope="col"
              >Mean</th>
              <th
                class="text-left"
                scope="col"
              >Min</th>
              <th
                class="text-left"
                scope="col"
              >P50</th>
              <th
                class="text-left"
                scope="col"
              >P75</th>
              <th
                class="text-left"
                scope="col"
              >P95</th>
              <th
                class="text-left"
                scope="col"
              >P99</th>
              <th
                class="text-left"
                scope="col"
              >Max</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-bind:key="entry"
              v-for="entry in ['acquire', 'creation', 'usage']"
            >
              <th
                class="text-left"
                scope="row"
              >{{ entry }}</th>
              <td class="text-left">{{ metrics.databases[entry]['count'] }}</td>
              <td class="text-left">{{ metrics.databases[entry]['mean'] }}</td>
              <td class="text-left">{{ metrics.databases[entry]['0.0'] }}</td>
              <td class="text-left">{{ metrics.databases[entry]['0.5'] }}</td>
              <td class="text-left">{{ metrics.databases[entry]['0.75'] }}</td>
              <td class="text-left">{{ metrics.databases[entry]['0.75'] }}</td>
              <td class="text-left">{{ metrics.databases[entry]['0.99'] }}</td>
              <td class="text-left">{{ metrics.databases[entry]['max'] }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <h6 class="q-my-md">Cache</h6>
      <div class="row items-start q-gutter-md">
        <q-markup-table>
          <thead>
            <tr>
              <th
                class="text-left"
                scope="col"
              >Cache Name</th>
              <th
                class="text-left"
                scope="col"
              >Cache Gets Miss</th>
              <th
                class="text-left"
                scope="col"
              >Cache Puts</th>
              <th
                class="text-left"
                scope="col"
              >Cache Gets Hit</th>
              <th
                class="text-left"
                scope="col"
              >Cache Removal</th>
              <th
                class="text-left"
                scope="col"
              >Cache Evictions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-bind:key="entry"
              v-for="(entry, key) in metrics.cache"
            >
              <td class="text-left">{{ key }}</td>
              <td class="text-left">{{ metrics.cache[key]['cache.gets.miss'] }}</td>
              <td class="text-left">{{ metrics.cache[key]['cache.puts'] }}</td>
              <td class="text-left">{{ metrics.cache[key]['cache.gets.hit'] }}</td>
              <td class="text-left">{{ metrics.cache[key]['cache.removals'] }}</td>
              <td class="text-left">{{ metrics.cache[key]['cache.evictions'] }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import { format as qformat } from 'quasar';
import { defineComponent, ref } from 'vue';
import { format, formatDistanceStrict } from '../util/format';

export default defineComponent({
  name: 'PageConfiguration',

  setup () {
    const metrics = ref();
    const { humanStorageSize, capitalize } = qformat;

    api.get('/management/jhimetrics').then(response => {
      metrics.value = response.data;
    });

    const percent = (value, total) => (value / total) * 100;

    return {
      metrics,
      format,
      formatDistanceStrict,
      humanStorageSize,
      capitalize,
      percent,
      percentMetric: metric => percent(metric.committed, metric.max),
    };
  },
});
</script>
