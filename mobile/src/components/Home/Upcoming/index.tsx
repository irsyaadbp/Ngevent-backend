import {EventData, getAllEvents} from '@ngevent/api/event';
import {globalStyles} from '@ngevent/styles/theme';
import * as React from 'react';
import {FlatList, View} from 'react-native';
import {Badge, Text, useTheme} from 'react-native-paper';
import {useQuery} from 'react-query';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {CardEvent} from '@ngevent/components/BaseComponent';
import {formatDate} from '@ngevent/utils/common';
export interface UpcomingProps {}
const Upcoming: React.FC<UpcomingProps> = ({}) => {
  const {colors} = useTheme();
  const startDate = React.useMemo(() => moment().toISOString(), []);
  const endDate = React.useMemo(
    () => moment(startDate).add(30, 'days').toISOString(),
    [startDate],
  );

  const {data, isLoading, refetch} = useQuery(
    [
      'events',
      {
        orderBy: 'asc',
        page: 1,
        sortBy: 'event_date',
        search: '',
        startDate,
        endDate,
      },
    ],
    ({queryKey}) => getAllEvents(queryKey[1]),
    {},
  );

  const renderItem = React.useCallback(({item}: {item: EventData}) => {
    return (
      <CardEvent
        data={{
          title: item.event_name,
          image: item.poster,
          description: `${item.location}, ${formatDate(item.event_date)}`,
          subtitle: `$${item.ticket_price}`,
          badge: item.category.category_name,
        }}
      />
    );
  }, []);

  return (
    <View style={{marginTop: 44}}>
      <Text style={globalStyles.titleSection}>Upcoming</Text>
      <FlatList
        keyExtractor={(item) => `upcoming-event-${item.id}`}
        data={data?.data || ([] as EventData[])}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Upcoming;
